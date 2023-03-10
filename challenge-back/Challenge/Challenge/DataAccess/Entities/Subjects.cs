using System.ComponentModel.DataAnnotations;

namespace Challenge.DataAccess.Entities
{
    public class Subjects
    {
        [Key]
        public long SubjectId { get; set; }
        public string Name { get; set; }
        public string Schedule { get; set; }
    }
}
