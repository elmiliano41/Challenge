using System;
using System.Threading.Tasks;
using Xunit;
using Moq;
using Challenge.Controllers;
using Challenge.DataAccess.Services.Interfaces;
using Challenge.DataAccess.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;

namespace Challenge.UnitTest.Controllers
{
    public class AccountControllerTests
    {
        private readonly Mock<IAccountsService> _accountsServiceMock;
        private readonly Mock<ILogger<AccountController>> _loggerMock;
        private readonly AccountController _controller;

        public AccountControllerTests()
        {
            _accountsServiceMock = new Mock<IAccountsService>();
            _loggerMock = new Mock<ILogger<AccountController>>();
            _controller = new AccountController(_accountsServiceMock.Object, _loggerMock.Object, null);
        }

        [Fact]
        public async Task GetAccount_ExistingAccountId_ReturnsAccount()
        {
            // Arrange
            int accountId = 1;
            var expectedAccount = new Accounts
            {
                Id = accountId,
                Name = "Sample Account"
            };

            _accountsServiceMock
                .Setup(service => service.GetAccount(accountId))
                .ReturnsAsync(expectedAccount);

            // Act
            var result = await _controller.GetAccount(accountId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var actualAccount = Assert.IsType<Accounts>(okResult.Value);
            Assert.Equal(expectedAccount.Id, actualAccount.Id);
            Assert.Equal(expectedAccount.Name, actualAccount.Name);
        }
    }
}
