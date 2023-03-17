using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Challenge.DataAccess.Entities
{
    public class Accounts
    {
        [Key]
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string ClientName { get; set; }
        public int OperationsManager { get; set; }
        public DateTime CreatedDate { get; set; }= DateTime.UtcNow;
    }
}
