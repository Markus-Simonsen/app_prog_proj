using Xunit;
using Moq;
using CourseAdminSystem.API.Controllers;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
public class ShitterControllerTests
{
    private readonly Mock<ShitterRepository> _repoMock;
    private readonly ShitterController _controller;
    public ShitterControllerTests()
    {
        _repoMock = new Mock<ShitterRepository>(null);
        _controller = new ShitterController(_repoMock.Object);
    }
    [Fact]
    public void GetShitter_ReturnsOk_WhenShitterExists()
    {
        var shitter = new Shitter(1) { FirstName = "John", LastName = "Doe" };
        _repoMock.Setup(r => r.GetShitterById(1)).Returns(shitter);
        var result = _controller.GetShitter(1);
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void GetShitter_ReturnsNotFound_WhenShitterDoesNotExist()
    {
        _repoMock.Setup(r => r.GetShitterById(1)).Returns((Shitter)null);
        var result = _controller.GetShitter(1);
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public void GetShitters_ReturnsOk_WithListOfShitters()
    {
        var shitters = new List<Shitter> { new Shitter(1), new Shitter(2) };
        _repoMock.Setup(r => r.GetShitters()).Returns(shitters);
        var result = _controller.GetShitters();
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenShitterIsNull()
    {
        var result = _controller.Post(null);
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Post_ReturnsOk_WhenInsertSucceeds()
    {
        var shitter = new Shitter(1);
        _repoMock.Setup(r => r.InsertShitter(shitter)).Returns(true);
        var result = _controller.Post(shitter);
        Assert.IsType<OkResult>(result);
    }


    [Fact]
    public void UpdateShitter_ReturnsNotFound_WhenShitterDoesNotExist()
    {
        var shitter = new Shitter(1);
        _repoMock.Setup(r => r.GetShitterById(1)).Returns((Shitter)null);
        var result = _controller.UpdateShitter(shitter);
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void DeleteShitter_ReturnsNoContent_WhenDeleteSucceeds()
    {
        var shitter = new Shitter(1);
        _repoMock.Setup(r => r.GetShitterById(1)).Returns(shitter);
        _repoMock.Setup(r => r.DeleteShitter(1)).Returns(true);
        var result = _controller.DeleteShitter(1);
        Assert.IsType<NoContentResult>(result);
    }
}