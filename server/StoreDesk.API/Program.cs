using Microsoft.EntityFrameworkCore;
using StoreDesk.API.Data;
using StoreDesk.API.Interfaces;
using StoreDesk.API.Services;
using StoreDesk.API.Middleware;
using Microsoft.AspNetCore.Mvc;
using StoreDesk.API.Common;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Values
                .SelectMany(value => value.Errors)
                .Select(error => error.ErrorMessage)
                .ToList();

            var response =
                ApiResponse<string>.FailureResponse(
                    "Validation failed",
                    errors);

            return new BadRequestObjectResult(response);
        };
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IItemService, ItemService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();

app.Run();
