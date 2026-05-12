using Xunit;
using Moq;
using CourseAdminSystem.API.Controllers;
using CourseAdminSystem.Model.Entities;
using CourseAdminSystem.Model.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
public class UserControllerTests
{
    private readonly Mock<IUserRepository> _repoMock;
    private readonly UserController _controller;
    public UserControllerTests()
    {
        _repoMock = new Mock<IUserRepository>();
        _controller = new UserController(_repoMock.Object);
    }
    [Fact]
    public void GetUser_ReturnsOk_WhenUserExists()
    {
        var user = new User(1) { FirstName = "John", LastName = "Doe" };
        _repoMock.Setup(r => r.GetUserById(1)).Returns(user);
        var result = _controller.GetUser(1);
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void GetUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        _repoMock.Setup(r => r.GetUserById(1)).Returns((User)null);
        var result = _controller.GetUser(1);
        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public void GetUsers_ReturnsOk_WithListOfUsers()
    {
        var users = new List<User> { new User(1), new User(2) };
        _repoMock.Setup(r => r.GetUsers()).Returns(users);
        var result = _controller.GetUsers();
        Assert.IsType<OkObjectResult>(result.Result);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenUserIsNull()
    {
        var result = _controller.Post(null);
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Post_ReturnsOk_WhenInsertSucceeds()
    {
        var user = new User(1);
        _repoMock.Setup(r => r.InsertUser(user)).Returns(true);
        var result = _controller.Post(user);
        Assert.IsType<OkResult>(result);
    }


    [Fact]
    public void UpdateUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        var user = new User(1);
        _repoMock.Setup(r => r.GetUserById(1)).Returns((User)null);
        var result = _controller.UpdateUser(user);
        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public void UpdateUser_ReturnsOk_WhenUpdateSucceeds()
    {
        var user = new User(1);
        _repoMock.Setup(r => r.GetUserById(1)).Returns(user);
        _repoMock.Setup(r => r.UpdateUser(user)).Returns(true);
        var result = _controller.UpdateUser(user);
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public void DeleteUser_ReturnsNoContent_WhenDeleteSucceeds()
    {
        var user = new User(1);
        _repoMock.Setup(r => r.GetUserById(1)).Returns(user);
        _repoMock.Setup(r => r.DeleteUser(1)).Returns(true);
        var result = _controller.DeleteUser(1);
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public void DeleteUser_ReturnsNotFound_WhenUserDoesNotExist()
    {
        _repoMock.Setup(r => r.GetUserById(1)).Returns((User)null);
        var result = _controller.DeleteUser(1);
        Assert.IsType<NotFoundObjectResult>(result);
    }
}