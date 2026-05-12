using Xunit;
using Moq;
using CourseAdminSystem.API.Controllers;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
public class ToiletControllerTests
{
    private readonly Mock<ToiletRepository> _repoMock;
    private readonly ToiletController _controller;
    public ToiletControllerTests()
    {
        _repoMock = new Mock<ToiletRepository>(null);
        _controller = new ToiletController(_repoMock.Object);
    }
    [Fact]
    public void GetToilet_ReturnsOk_WhenToiletExists()
    {
        var toilet = new Toilet(1) { Location = 55121234 };
        _repoMock.Setup(r => r.GetToiletById(1)).Returns(toilet);
        var result = _controller.GetToilet(1);
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void GetToilet_ReturnsNotFound_WhenToiletDoesNotExist()
    {
        _repoMock.Setup(r => r.GetToiletById(1)).Returns((Toilet)null);
        var result = _controller.GetToilet(1);
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public void GetToilets_ReturnsOk_WithListOfToilets()
    {
        var toilets = new List<Toilet> { new Toilet(1), new Toilet(2) };
        _repoMock.Setup(r => r.GetToilets()).Returns(toilets);
        var result = _controller.GetToilets();
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenToiletIsNull()
    {
        var result = _controller.Post(null);
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Post_ReturnsOk_WhenInsertSucceeds()
    {
        var toilet = new Toilet(1);
        _repoMock.Setup(r => r.InsertToilet(toilet)).Returns(toilet);
        var result = _controller.Post(toilet);
        Assert.IsType<OkObjectResult>(result);
    }


    [Fact]
    public void UpdateToilet_ReturnsNotFound_WhenToiletDoesNotExist()
    {
        var toilet = new Toilet(1);
        _repoMock.Setup(r => r.GetToiletById(1)).Returns((Toilet)null);
        var result = _controller.UpdateToilet(toilet);
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void DeleteToilet_ReturnsNoContent_WhenDeleteSucceeds()
    {
        var toilet = new Toilet(1);
        _repoMock.Setup(r => r.GetToiletById(1)).Returns(toilet);
        _repoMock.Setup(r => r.DeleteToilet(1)).Returns(true);
        var result = _controller.DeleteToilet(1);
        Assert.IsType<NoContentResult>(result);
    }
}