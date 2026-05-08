using StoreDesk.API.DTOs;

namespace StoreDesk.API.Interfaces;

public interface IItemService
{
    Task<IEnumerable<ItemResponseDto>> GetAllAsync(
        string? search,
        int? categoryId,
        PaginationDto pagination);

    Task<ItemResponseDto?> GetByIdAsync(int id);

    Task<ItemResponseDto> CreateAsync(CreateItemDto dto);

    Task<ItemResponseDto?> UpdateAsync(
        int id,
        UpdateItemDto dto);

    Task<bool> DeleteAsync(int id);
}