using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using StoreDesk.API.DTOs;
using StoreDesk.API.Interfaces;
using StoreDesk.API.Models;

namespace StoreDesk.API.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly IConfiguration _configuration;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> RegisterAsync(
        RegisterDto dto)
    {
        var existingUser = await _userManager
            .FindByEmailAsync(dto.Email);

        if (existingUser is not null)
        {
            throw new Exception("Email already exists");
        }

        var user = new ApplicationUser
        {
            FullName = dto.FullName,
            Email = dto.Email,
            UserName = dto.Email
        };

        var result = await _userManager
            .CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors
                .Select(error => error.Description);

            throw new Exception(string.Join(", ", errors));
        }

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email!,
            FullName = user.FullName
        };
    }

    public async Task<AuthResponseDto?> LoginAsync(
        LoginDto dto)
    {
        var user = await _userManager
            .FindByEmailAsync(dto.Email);

        if (user is null)
        {
            return null;
        }

        var validPassword = await _userManager
            .CheckPasswordAsync(user, dto.Password);

        if (!validPassword)
        {
            return null;
        }

        var token = GenerateJwtToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email!,
            FullName = user.FullName
        };
    }

    private string GenerateJwtToken(
        ApplicationUser user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),

            new(JwtRegisteredClaimNames.Email, user.Email!),

            new(JwtRegisteredClaimNames.Name, user.FullName)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],

            audience: _configuration["Jwt:Audience"],

            claims: claims,

            expires: DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(
                    _configuration["Jwt:DurationInMinutes"])),

            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}