using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse httpResponse, string message)
        {
            httpResponse.Headers.Add("access-control-allow-origin", "*");
            httpResponse.Headers.Add("access-control-expose-headers", "application-error");
            httpResponse.Headers.Add("application-error", message);
        }

        public static int CaluclateAge(this DateTime datetime)
        {
            var age = DateTime.Now.Year - datetime.Year;
            return age--;
        }
    }
}