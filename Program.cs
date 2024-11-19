using Microsoft.AspNetCore.Localization;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Adicionar suporte a localização (idiomas)
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// Configurar serviços do Razor Pages
builder.Services.AddRazorPages();

var app = builder.Build();

// Configurar middleware de localização
var supportedCultures = new[] { "pt-BR", "en-US" };
var localizationOptions = new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("pt-BR"),
    SupportedCultures = supportedCultures.Select(c => new CultureInfo(c)).ToList(),
    SupportedUICultures = supportedCultures.Select(c => new CultureInfo(c)).ToList()
};
app.UseRequestLocalization(localizationOptions);

// Configuração do pipeline de requisições HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

// Middleware para redirecionar da raiz para "/Home"
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/Home");
        return;
    }

    context.Response.Headers.Append("Content-Type", "text/html; charset=utf-8");
    await next();
});

app.UseAuthorization();

// Configurar o mapeamento de endpoints (Controller)
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

// Mapeamento do Razor Pages
app.MapRazorPages();

app.Run();
