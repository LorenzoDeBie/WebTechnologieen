using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Labo4Webtech.Models
{
    public class TheatersContext : DbContext
    {
        public TheatersContext (DbContextOptions<TheatersContext> options)
            : base(options)
        {
        }

        public DbSet<Labo4Webtech.Models.NewsMessage> NewsMessage { get; set; }
    }
}
