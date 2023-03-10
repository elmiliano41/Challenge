namespace Challenge.DataAccess.DTO
{
    public class MovementsDTO
    {
        public int MovementId { get; set; }
        public int OriginTeam { get; set; }
        public int TargetTeam { get; set; }
        public int UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
