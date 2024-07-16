using System.ComponentModel.DataAnnotations;

namespace api_rest.Models
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required]
        //[StringLength(100)]
        public string Descricao { get; set; }

        //[Required]
        //[StringLength(100)]
        //public DateTime Data { get; set; }
        //public Boolean estaConcluida { get; set; }

        //Adicionar categoria da tarefa (???)
    }
}
