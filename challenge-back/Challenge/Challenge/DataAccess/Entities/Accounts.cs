using System.ComponentModel.DataAnnotations;

namespace Challenge.DataAccess.Entities
{
    public class Accounts
    {
        [Key]
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string ClientName { get; set; }
        public string OperationsManager { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
