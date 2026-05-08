using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Data;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardStatsDto>GetStatsAsync()
    {
        var totalItems = await _context.Items.CountAsync();
        var totalCategories = await _context.Categories.CountAsync();
        var lowStockItems = await _context.Items.CountAsync(item => item.Quantity < 5);
        var activeTransactions = await _context.Transactions.CountAsync(transaction => !transaction.IsReturned);
        var returnedTransactions = await _context.Transactions.CountAsync(transaction => transaction.IsReturned);

        return new DashboardStatsDto
        {
            TotalItems = totalItems,
            TotalCategories = totalCategories,
            LowStockItems = lowStockItems,
            ActiveTransactions = activeTransactions,
            ReturnedTransactions = returnedTransactions
        };
    }
}