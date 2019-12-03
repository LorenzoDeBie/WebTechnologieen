using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterAcademie.Models
{
    public class NewsMessage
    {
        public int? Id { get; set; }

		[Display(Name = "Nieuwsbericht titel")]
		[Required]
		public string Title { get; set; }

		[Display(Name = "Bericht")]
		[Required]
        public string Message { get; set; }

		[Display(Name = "Datum")]
		[Required]
		public DateTime Date { get; set; }

    }
}
