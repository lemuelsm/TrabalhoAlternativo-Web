using api_rest.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace api_rest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) 
        {
            services.AddControllers();




            services.AddDbContext<AppDbContext>(options => 
            {
                options.UseInMemoryDatabase("MeuBancoNaMemoria");
            });


            //services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(WebApplication app, IWebHostEnvironment env) 
        {
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
               // app.UseSwagger();
               // app.UseSwaggerUI();
            }




            if (app.Environment.IsDevelopment())
            {

                app.UseSwagger();
                app.UseSwaggerUI();



                // Inicialização do banco de dados sem aplicar migrações
                using (var serviceScope = app.Services.CreateScope())
                {
                    var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
                    context.Database.EnsureCreated(); // Cria o banco de dados se ainda não existir
                }

                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }


            app.UseCors(options => 
            {
                options.WithOrigins("http://localhost:3000");
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });



            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();
        }
    }
}
