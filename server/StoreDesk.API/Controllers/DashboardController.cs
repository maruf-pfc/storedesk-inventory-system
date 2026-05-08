using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;

namespace StoreDesk.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<ActionResult> GetDashboardStats()
    {
        var stats = await _dashboardService.GetStatsAsync();

        return Ok(ApiResponse<DashboardStatsDto>
                .SuccessResponse(
                    stats,
                    "Dashboard statistics fetched successfully"
                ));
    }
}