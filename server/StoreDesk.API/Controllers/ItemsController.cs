using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Controllers;

[ApiController]
[Route("api/items")]
public class ItemsController : ControllerBase
{
    private readonly IItemService _itemService;

    public ItemsController(IItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemResponseDto>>> GetItems(
        [FromQuery] string? search,
        [FromQuery] int? categoryId,
        [FromQuery] PaginationDto pagination,
        [FromQuery] SortDto sort)
    {
        var items = await _itemService.GetAllAsync(
            search,
            categoryId,
            pagination,
            sort);

        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ItemResponseDto>> GetItemById(
        int id)
    {
        var item = await _itemService.GetByIdAsync(id);

        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<ItemResponseDto>> CreateItem(
        CreateItemDto dto)
    {
        var item = await _itemService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetItemById),
            new { id = item.Id },
            item);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ItemResponseDto>> UpdateItem(
        int id,
        UpdateItemDto dto)
    {
        var item = await _itemService.UpdateAsync(id, dto);

        if (item is null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
        var deleted = await _itemService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}