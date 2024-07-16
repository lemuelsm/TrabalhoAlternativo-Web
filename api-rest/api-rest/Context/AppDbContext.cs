using Microsoft.EntityFrameworkCore;
using api_rest.Models;

namespace api_rest.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet <Tarefa> Tarefas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            //{
                optionsBuilder.UseInMemoryDatabase("MeuBancoNaMemoria");
            //}
        }

    }
}
