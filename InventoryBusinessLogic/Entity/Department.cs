namespace InventoryBusinessLogic.Entity
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Department")]
    public partial class Department
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Department()
        {
            AspNetUsers = new HashSet<AspNetUsers>();
            Order = new HashSet<Order>();
        }

        [StringLength(20)]
        public string DepartmentID { get; set; }

        [StringLength(20)]
        public string DepartmentRep { get; set; }

        [StringLength(20)]
        public string DepartmentHead { get; set; }

        [StringLength(50)]
        public string DepartmentName { get; set; }

        [StringLength(200)]
        public string CollectionPoint { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DepartmentHeadStartDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DepartmentHeadEndDate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AspNetUsers> AspNetUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Order> Order { get; set; }
    }
}