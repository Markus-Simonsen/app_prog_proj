using Xunit;
using Moq;
using CourseAdminSystem.API.Controllers;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
public class VisitControllerTests
{
    private readonly Mock<VisitRepository> _repoMock;
    private readonly VisitController _controller;
    public VisitControllerTests()
    {
        _repoMock = new Mock<VisitRepository>(null);
        _controller = new VisitController(_repoMock.Object);
    }
    [Fact]
    public void GetVisit_ReturnsOk_WhenVisitExists()
    {
        var visit = new Visit(1) { VisitID = 1001 };
        _repoMock.Setup(r => r.GetVisitById(1)).Returns(visit);
        var result = _controller.GetVisit(1);
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void GetVisit_ReturnsNotFound_WhenVisitDoesNotExist()
    {
        _repoMock.Setup(r => r.GetVisitById(1)).Returns((Visit)null);
        var result = _controller.GetVisit(1);
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public void GetVisits_ReturnsOk_WithListOfVisits()
    {
        var visits = new List<Visit> { new Visit(1), new Visit(2) };
        _repoMock.Setup(r => r.GetMoreVisits()).Returns(visits);
        var result = _controller.GetMoreVisits(null);
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenVisitIsNull()
    {
        var result = _controller.Post(null);
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Post_ReturnsOk_WhenInsertSucceeds()
    {
        var visit = new Visit(1);
        _repoMock.Setup(r => r.InsertVisit(visit)).Returns(true);
        var result = _controller.Post(visit);
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void UpdateVisit_ReturnsNotFound_WhenVisitDoesNotExist()
    {
        var visit = new Visit(1);
        _repoMock.Setup(r => r.GetVisitById(1)).Returns((Visit)null);
        var result = _controller.UpdateVisit(visit);
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void DeleteVisit_ReturnsNoContent_WhenDeleteSucceeds()
    {
        var visit = new Visit(1);
        _repoMock.Setup(r => r.GetVisitById(1)).Returns(visit);
        _repoMock.Setup(r => r.DeleteVisit(1)).Returns(true);
        var result = _controller.DeleteVisit(1);
        Assert.IsType<NoContentResult>(result);
    }


}