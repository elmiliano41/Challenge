using System.ComponentModel.DataAnnotations;

namespace Challenge.DataAccess.Entities
{
    public class Teams
    {
        [Key]
        public int TeamId { get; set; }
        public string Name { get; set; }
        public int AccountId { get; set; }
    }
}
