using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public static class UserSeed
    {
        public static void SeedUsers(DataContext conext)
        {
            if(conext.Users.Any()) return;

            var userdata = File.ReadAllText("Data/SeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userdata);

            byte[] passwordHash, passwordSalt;
            foreach (var user in users)
            {
                CreatePasswordHash("12345",out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username=user.Username.ToLower();
                conext.Users.Add(user);
            }
            conext.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}