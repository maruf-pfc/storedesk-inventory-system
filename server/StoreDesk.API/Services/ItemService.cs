using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Data;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;
using StoreDesk.API.Models;

namespace StoreDesk.API.Services;

public class ItemService : IItemService
{
    private readonly AppDbContext _context;

    public ItemService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ItemResponseDto>> GetAllAsync(
        string? search,
        int? categoryId,
        PaginationDto pagination)
    {
        var query = _context.Items
            .Include(item => item.Category)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(item =>
                item.Name.ToLower().Contains(search.ToLower()));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(item =>
                item.CategoryId == categoryId.Value);
        }

        query = query
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize);

        var items = await query
            .Select(item => new ItemResponseDto
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Quantity = item.Quantity,
                CategoryId = item.CategoryId,
                CategoryName = item.Category!.Name
            })
            .ToListAsync();

        return items;
    }

    public async Task<ItemResponseDto?> GetByIdAsync(int id)
    {
        return await _context.Items
            .Include(item => item.Category)
            .Where(item => item.Id == id)
            .Select(item => new ItemResponseDto
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                Quantity = item.Quantity,
                CategoryId = item.CategoryId,
                CategoryName = item.Category!.Name
            })
            .FirstOrDefaultAsync();
    }

    public async Task<ItemResponseDto> CreateAsync(
        CreateItemDto dto)
    {
        var item = new Item
        {
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Quantity = dto.Quantity,
            CategoryId = dto.CategoryId
        };

        _context.Items.Add(item);

        await _context.SaveChangesAsync();

        var category = await _context.Categories
            .FirstAsync(category => category.Id == dto.CategoryId);

        return new ItemResponseDto
        {
            Id = item.Id,
            Name = item.Name,
            Description = item.Description,
            Price = item.Price,
            Quantity = item.Quantity,
            CategoryId = item.CategoryId,
            CategoryName = category.Name
        };
    }

    public async Task<ItemResponseDto?> UpdateAsync(
        int id,
        UpdateItemDto dto)
    {
        var item = await _context.Items
            .Include(item => item.Category)
            .FirstOrDefaultAsync(item => item.Id == id);

        if (item is null)
        {
            return null;
        }

        item.Name = dto.Name;
        item.Description = dto.Description;
        item.Price = dto.Price;
        item.Quantity = dto.Quantity;
        item.CategoryId = dto.CategoryId;

        await _context.SaveChangesAsync();

        return new ItemResponseDto
        {
            Id = item.Id,
            Name = item.Name,
            Description = item.Description,
            Price = item.Price,
            Quantity = item.Quantity,
            CategoryId = item.CategoryId,
            CategoryName = item.Category?.Name ?? string.Empty
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _context.Items
            .FirstOrDefaultAsync(item => item.Id == id);

        if (item is null)
        {
            return false;
        }

        _context.Items.Remove(item);

        await _context.SaveChangesAsync();

        return true;
    }
}