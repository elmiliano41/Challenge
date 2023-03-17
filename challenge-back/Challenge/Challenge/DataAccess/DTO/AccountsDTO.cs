namespace Challenge.DataAccess.DTO
{
    public class AccountsDTO
    {
        public int AccountId { get; set; }
        public string Name { get; set; }
        public string ClientName { get; set; }
        public string OperationsManager { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
