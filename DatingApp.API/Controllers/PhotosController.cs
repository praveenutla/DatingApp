using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/user/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        
        private readonly Cloudinary _cloudinary;

        public PhotosController(DataContext context, IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> CloudinaryConfig)
        {
            _context = context;
            _repo = repo;
            _mapper = mapper;
            _cloudinaryConfig = CloudinaryConfig;

            Account account = new Account(
                CloudinaryConfig.Value.Cloudname,
                CloudinaryConfig.Value.ApiKey,
                CloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if(userId!= Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
                
            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();
            
            if(file.Length == 0)
                return BadRequest("Image is empty");
            
            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation().Gravity("face").Height(500).Width(500).Crop("thumb")
                };
                uploadResult = _cloudinary.Upload(uploadParams);
            }

            photoForCreationDto.PublicId = uploadResult.PublicId;
            photoForCreationDto.Url = uploadResult.SecureUrl.ToString();

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if(!userFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);

            if(await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnedDto>(photo);
                return CreatedAtRoute("GetPhoto", new {userId = userId, id = photo.Id}, photoToReturn);
            }

            return BadRequest("Upload not success");
        }

        [HttpGet("id", Name ="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromrepo = await _repo.GetPhoto(id);
            var returnPhoto = _mapper.Map<PhotoForReturnedDto>(photoFromrepo);
            return Ok(returnPhoto);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if(userId!= Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            
            if(!userFromRepo.Photos.Any(p => p.Id == id))
                return Unauthorized();
            
            var photoFromRepo = await _repo.GetPhoto(id);
            if(photoFromRepo.IsMain)
                return BadRequest("This is already Main photo");
            
            var mainPhotoForUser = await _repo.GetMainPhotoForUser(userId);
            mainPhotoForUser.IsMain = false;
            photoFromRepo.IsMain = true;

            if(await _repo.SaveAll())
                return NoContent();
            
            return BadRequest("Unable to set Main Photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if(userId!= Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);
            
            if(!userFromRepo.Photos.Any(p => p.Id == id))
                return Unauthorized();
            
            var photoFromRepo = await _repo.GetPhoto(id);

            if(photoFromRepo.IsMain)
                return BadRequest("Cannot delete main photo");

            if(photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);
                var result = await _cloudinary.DestroyAsync(deleteParams);
                if(result.Result == "ok")
                    _context.Remove(photoFromRepo);
            }
            else
                _context.Remove(photoFromRepo);

            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to delete Photo");
        }
    }
}