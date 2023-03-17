using Microsoft.EntityFrameworkCore;
using Challenge.DataAccess.Entities;

namespace Challenge.DataAccess.Repository.Context
{
    public class ChallengeSystemContext : DbContext
    {
        private static ChallengeSystemContext? challengeSystemContext;

        public ChallengeSystemContext()
        {
        }

        public ChallengeSystemContext(DbContextOptions<ChallengeSystemContext> options)
            : base(options)
        {
        }
        public DbSet<Sessions> Sessions { get; set; }
        //public DbSet<Movements> Movements { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<Teams> Teams { get; set; }

        public static ChallengeSystemContext Create()
        {
            if(challengeSystemContext==null)
                challengeSystemContext = new ChallengeSystemContext();
            return challengeSystemContext;
        }
    }
}
