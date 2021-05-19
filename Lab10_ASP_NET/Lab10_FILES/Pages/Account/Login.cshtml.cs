using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Lab10_FILES.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Lab10_FILES.Pages.Account
{
    public class Login : PageModel
    {
        private User[] _users =
        {
            new User("aa","bb",true),
            new User("bb","cc",false)
        };

        [Required] public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me")] public bool RememberMe { get; set; }


        private void AddParametersToSession(string username, string password, bool isAdmin)
        {
            HttpContext.Session.SetString(Configurator.USERNAME, username);
            HttpContext.Session.SetString(Configurator.PASSWORD, password);

            var isAdminValue = isAdmin ? 1 : 0;
            HttpContext.Session.SetInt32(Configurator.IS_ADMIN, isAdminValue);
        }
            
        public async Task<IActionResult> OnPostAsync(string Username, string Password)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            //TODO ask why Username does not get the value automatically on post 
            /*Console.WriteLine(this.Username);
            this.Username = Username;
            this.Password = Password;
            Console.WriteLine(this.Username);*/

            bool userFound = false;
            foreach (User user in _users)
            {
                if (user.Username == Username && user.Password == Password)
                {
                    userFound = true;
                    if (user.IsAdmin)
                    {
                        AddParametersToSession(Username, Password, true);
                        break;
                    }
                    else
                    {
                        AddParametersToSession(Username, Password, false);
                        break;
                    }
                }
                
            }
            if (!userFound)
            {
                ModelState.AddModelError("WrongCredentials", "Wrong Username or Password");
                return Page();
            }
            return RedirectToPage("../Books/Index");
        }
    }
}