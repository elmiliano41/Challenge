using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Challenge.DataAccess.Entities
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CV { get; set; }
        public string TechnicalKnowledge { get; set; }
        public bool isAdmin { get; set; }
        public int EnglishLevelId { get; set; }
        public int TeamId { get; set; }
    }
}
