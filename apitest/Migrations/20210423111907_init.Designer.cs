﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using apitest.Data;

namespace apitest.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20210423111907_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("apitest.Models.MyGuest", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int(6) unsigned")
                        .HasColumnName("id");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("email")
                        .UseCollation("utf8_general_ci")
                        .HasCharSet("utf8");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("name")
                        .UseCollation("utf8_general_ci")
                        .HasCharSet("utf8");

                    b.Property<DateTime>("RegDate")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("timestamp")
                        .HasColumnName("reg_date")
                        .HasDefaultValueSql("current_timestamp()");

                    b.HasKey("Id");

                    b.ToTable("MyGuests");
                });
#pragma warning restore 612, 618
        }
    }
}