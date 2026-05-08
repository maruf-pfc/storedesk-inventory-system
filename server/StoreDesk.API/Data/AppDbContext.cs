using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Models;

namespace StoreDesk.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Item> Items => Set<Item>();
}