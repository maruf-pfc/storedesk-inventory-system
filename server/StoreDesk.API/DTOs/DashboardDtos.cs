namespace StoreDesk.API.DTOs;

public class DashboardStatsDto
{
    public int TotalItems { get; set; }
    public int TotalCategories { get; set; }
    public int LowStockItems { get; set; }
    public int ActiveTransactions { get; set; }
    public int ReturnedTransactions { get; set; }
}