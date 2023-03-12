namespace Challenge.DataAccess.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CV { get; set; }
        public string TechnicalKnowledge { get; set; }
        public bool isAdmin { get; set; }
        public bool isSU { get; set; }
        public int EnglishLevelId { get; set; }
        public int TeamId { get; set; }
    }
}
