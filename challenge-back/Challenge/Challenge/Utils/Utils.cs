using Challenge.Utils.Interfaces;

namespace Challenge.Utils
{
    public class Utils : IUtils
    {
        public Guid GenerateToken() => Guid.NewGuid();

        public String GenerateTokenString() => Guid.NewGuid().ToString();
    }
}
