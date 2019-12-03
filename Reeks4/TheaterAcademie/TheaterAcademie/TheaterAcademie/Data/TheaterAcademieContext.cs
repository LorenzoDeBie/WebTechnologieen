using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TheaterAcademie.Models;

namespace TheaterAcademie.Models
{
    public class TheaterAcademieContext : DbContext
    {
        public TheaterAcademieContext (DbContextOptions<TheaterAcademieContext> options)
            : base(options)
        {
        }

        public DbSet<TheaterAcademie.Models.NewsMessage> NewsMessage { get; set; }
    }
}
