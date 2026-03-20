using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ShitterRepository, ShitterRepository>();
builder.Services.AddScoped<AShitRepository, AShitRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// removed due to instructions from Abid
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
