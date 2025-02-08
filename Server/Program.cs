using Microsoft.EntityFrameworkCore;
using TodoApi;
using Pomelo.EntityFrameworkCore.MySql;
using System.Reflection.Metadata.Ecma335;

var builder = WebApplication.CreateBuilder(args);

var toDoDb = builder.Configuration.GetConnectionString("ToDoDB");
builder.Services.AddDbContext<ToDoDbContext>(opt =>
 opt.UseMySql(toDoDb,
 ServerVersion.AutoDetect(toDoDb)));

builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy => {
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI(c =>
{
    
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");;
    c.RoutePrefix = string.Empty;
});

// }
app.UseCors("MyPolicy");


app.MapGet("/items", async (ToDoDbContext db) => {
return await db.Items.ToListAsync();
}
);

app.MapGet("/items/{id}", async (int id, ToDoDbContext db) => {
    var item = await db.Items.FindAsync(id);
    return item is not null ? Results.Ok(item) : Results.NotFound();
});

//
app.MapPost("/items", async (Item item, ToDoDbContext db) =>{
db.Items.Add(item);
await db.SaveChangesAsync();
return Results.Created($"/items/{item.Id}", item);
});

app.MapPut("/items/{id}",async (int id, Item updateItem, ToDoDbContext db) =>{
var item = await db.Items.FindAsync(id);

if (item is null)
return Results.NotFound();
if(updateItem.Name!=null)
item.Name = updateItem.Name;

item.IsComplete = updateItem.IsComplete;
await db.SaveChangesAsync();
return Results.NoContent();

});
app.MapDelete("/items/{id}",async (int id, ToDoDbContext db) => {
var item = await db.Items.FindAsync(id);

if (item is null)
return Results.NotFound();

db.Items.Remove(item);

await db.SaveChangesAsync();
return Results.NoContent();
});


app.MapGet("/",() => "Server API is running !!");
app.MapGet("/abc",() => "ABC 🔤 !!");
app.Run();
