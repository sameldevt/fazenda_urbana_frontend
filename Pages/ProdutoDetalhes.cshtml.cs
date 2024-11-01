using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc;

namespace fazenda_test.Pages
{
    public class ProdutoDetalhesModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public int ProductId { get; set; }

        public void OnGet(int id)
        {
            ProductId = id; // Armazena o ID do produto para o JavaScript
        }
    }
}
