using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;

namespace fazenda_test.Pages.Produto
{
    public class DetalhesModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public int ProductId { get; set; }

        public void OnGet(int id)
        {
            ProductId = id;
        }
    }
}
