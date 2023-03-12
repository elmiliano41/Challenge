using System.ComponentModel.DataAnnotations;

namespace Challenge.DataAccess.Entities
{
    public partial class Sessions
    {
        [Key]
        public int SessionId { get; set; }

        public int UserId { get; set; }

        [Required]

        public string UserToken { get; set; }

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public DateTime ExpirationDate { get; set; }
        public bool isAdmin { get; set; }
        public bool isSU { get; set; }
    }
}
