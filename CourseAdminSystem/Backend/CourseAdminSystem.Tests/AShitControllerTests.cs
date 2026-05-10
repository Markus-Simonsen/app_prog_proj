using Xunit;
using Moq;
using CourseAdminSystem.API.Controllers;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
public class AShitControllerTests
{
private readonly Mock<AShitRepository> _repoMock;
private readonly AShitController _controller;
public AShitControllerTests()
{
_repoMock = new Mock<AShitRepository>(null);
_controller = new AShitController(_repoMock.Object);
}
[Fact]
public void GetAShit_ReturnsOk_WhenAShitExists()
{
var ashit = new AShit(1) { ShitID = 1001 };
_repoMock.Setup(r => r.GetAShitById(1)).Returns(ashit);
var result = _controller.GetAShit(1);
Assert.IsType<OkObjectResult>(result.Result);
}

[Fact]
public void GetAShit_ReturnsNotFound_WhenAShitDoesNotExist()
{
_repoMock.Setup(r => r.GetAShitById(1)).Returns((AShit)null);
var result = _controller.GetAShit(1);
Assert.IsType<NotFoundResult>(result.Result);
}

[Fact]
public void GetAShits_ReturnsOk_WithListOfAShits()
{
var ashits = new List<AShit> { new AShit(1), new AShit(2) };
_repoMock.Setup(r => r.GetMoreShits()).Returns(ashits);
var result = _controller.GetMoreShits(null);
Assert.IsType<OkObjectResult>(result.Result);
}

[Fact]
public void Post_ReturnsBadRequest_WhenAShitIsNull()
{
var result = _controller.Post(null);
Assert.IsType<BadRequestObjectResult>(result);
}

[Fact]
public void Post_ReturnsOk_WhenInsertSucceeds()
{
var ashit = new AShit(1);
_repoMock.Setup(r => r.InsertAShit(ashit)).Returns(true);
var result = _controller.Post(ashit);
Assert.IsType<OkResult>(result);
}

[Fact]
public void UpdateAShit_ReturnsNotFound_WhenAShitDoesNotExist()
{
var ashit = new AShit(1);
_repoMock.Setup(r => r.GetAShitById(1)).Returns((AShit)null);
var result = _controller.UpdateAShit(ashit);
Assert.IsType<NotFoundObjectResult>(result);
}

[Fact]
public void DeleteAShit_ReturnsNoContent_WhenDeleteSucceeds()
{
var ashit = new AShit(1);
_repoMock.Setup(r => r.GetAShitById(1)).Returns(ashit);
_repoMock.Setup(r => r.DeleteAShit(1)).Returns(true);
var result = _controller.DeleteAShit(1);
Assert.IsType<NoContentResult>(result);
}


}