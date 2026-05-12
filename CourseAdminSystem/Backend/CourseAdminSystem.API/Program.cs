using CourseAdminSystem.Model.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UserRepository, UserRepository>();
builder.Services.AddScoped<VisitRepository, VisitRepository>();
builder.Services.AddScoped<ToiletRepository, ToiletRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// removed due to instructions from Abid
// app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAuthorization();

app.MapControllers();

app.Run();
