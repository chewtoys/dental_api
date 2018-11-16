"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const refs_1 = require("../src/refs");
class InititalDatabaseForTest {
    static loginRootAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const branchMaster = yield refs_1.Branch.findOne({ isMaster: true });
            const rootUser = yield refs_1.LoginService.login(refs_1.ROOT_PHONE, refs_1.DEFAULT_PASSWORD);
            return { rootUser, branchMaster };
        });
    }
    static createNormalBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster } = yield this.loginRootAccount();
            const normalBranch = yield refs_1.CreateBranchService.create(rootUser._id, 'Normal Branch', 'normalbranch@gmail.com', '0123', 'HCM', 'Phu Nhuan', 'Address');
            return { rootUser, branchMaster, normalBranch };
        });
    }
    static createService() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const service = yield refs_1.CreateService.create(rootUser._id, 'Service name', 100, ['Quy trinh'], [], 'Unit', 200);
            return { rootUser, branchMaster, service, normalBranch };
        });
    }
    static createProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const product = yield refs_1.CreateProductService.create(rootUser._id, 'Product Name', 100, 'VN', 'Unit', 200);
            return { rootUser, branchMaster, normalBranch, product };
        });
    }
    static createClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const client = yield refs_1.CreateClientService.create(rootUser._id, 'Client', '0123', 'client@gmail.com', Date.now(), [], 'HCM', 'Phu Nhuan', '95/54 Huynh Van Banh', 'Phan Thiet');
            return { rootUser, branchMaster, normalBranch, client };
        });
    }
    static testGetAllUserInCurrentBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const user1 = yield refs_1.CreateUserService.create(rootUser._id, 'User 1', 'user1@gmail.com', '01', 'password');
            const user2 = yield refs_1.CreateUserService.create(rootUser._id, 'User 2', 'user2@gmail.com', '02', 'password');
            const user3 = yield refs_1.CreateUserService.create(rootUser._id, 'User 3', 'user3@gmail.com', '03', 'password');
            const user4 = yield refs_1.CreateUserService.create(rootUser._id, 'User 4', 'user4@gmail.com', '04', 'password');
            const user5 = yield refs_1.CreateUserService.create(rootUser._id, 'User 5', 'user5@gmail.com', '05', 'password');
            const user6 = yield refs_1.CreateUserService.create(rootUser._id, 'User 6', 'user6@gmail.com', '06', 'password');
            const user7 = yield refs_1.CreateUserService.create(rootUser._id, 'User 7', 'user7@gmail.com', '07', 'password');
            yield refs_1.SetRoleInBranchService.set(user1._id, normalBranch._id, [refs_1.Role.CUSTOMER_CARE]);
            yield refs_1.SetRoleInBranchService.set(user2._id, normalBranch._id, [refs_1.Role.DENTIST]);
            yield refs_1.SetRoleInBranchService.set(user3._id, normalBranch._id, [refs_1.Role.DENTISTS_MANAGER]);
            yield refs_1.SetRoleInBranchService.set(user4._id, normalBranch._id, [refs_1.Role.ACCOUNTANT]);
            yield refs_1.SetRoleInBranchService.set(user5._id, normalBranch._id, [refs_1.Role.ACCOUNTANT]);
            yield refs_1.SetRoleInBranchService.set(user6._id, normalBranch._id, [refs_1.Role.ACCOUNTING_MANAGER]);
            yield refs_1.SetRoleInBranchService.set(user7._id, normalBranch._id, [refs_1.Role.DENTIST]);
            yield refs_1.CreateUserService.create(rootUser._id, 'Director', 'director@gmail.com', '08', 'password');
            const userDirect = yield refs_1.LoginService.login('08', 'password');
            yield refs_1.SetRoleInBranchService.set(userDirect._id, normalBranch._id, [refs_1.Role.DIRECTOR]);
            // const check = await User.findById(userDirect._id);
            // console.log(check);
            return { rootUser, branchMaster, normalBranch, userDirect };
        });
    }
    static testCreateTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch, client } = yield this.createClient();
            const service1 = yield refs_1.CreateService.create(rootUser._id, 'Service 1', 100, [], [], 'Unit', 100);
            const service2 = yield refs_1.CreateService.create(rootUser._id, 'Service 2', 200, [], [], 'Unit', 100);
            const service3 = yield refs_1.CreateService.create(rootUser._id, 'Service 3', 300, [], [], 'Unit', 100);
            const service4 = yield refs_1.CreateService.create(rootUser._id, 'Service 4', 400, [], [], 'Unit', 100);
            const service5 = yield refs_1.CreateService.create(rootUser._id, 'Service 5', 500, [], [], 'Unit', 100);
            const dentist = yield refs_1.CreateUserService.create(rootUser._id, 'Dentist', 'dentist@gmail.com', '0999999', 'password');
            yield refs_1.SetRoleInBranchService.set(dentist._id, normalBranch._id, [refs_1.Role.DENTIST]);
            yield refs_1.CreateUserService.create(rootUser._id, 'Staff', 'staff@gmail.com', '222222', 'password');
            const staffCustomerCase = yield refs_1.LoginService.login('staff@gmail.com', 'password');
            yield refs_1.SetRoleInBranchService.set(staffCustomerCase._id, normalBranch._id, [refs_1.Role.CUSTOMER_CARE]);
            return { rootUser, branchMaster, normalBranch, client, services: [service1, service2, service3, service4, service5], dentist, staffCustomerCase };
        });
    }
    static testUpdateTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch, client, services, dentist, staffCustomerCase } = yield this.testCreateTicket();
            const dentist2 = yield refs_1.CreateUserService.create(rootUser._id, 'Dentist2', 'dentist2@gmail.com', '09999992', 'password');
            yield refs_1.SetRoleInBranchService.set(dentist2._id, normalBranch._id, [refs_1.Role.DENTIST]);
            const items = [{
                    service: services[0]._id,
                    qty: 1
                }, {
                    service: services[1]._id,
                    qty: 2
                }];
            const ticket = yield refs_1.CreateTicketService.create(client._id, staffCustomerCase._id, dentist._id, normalBranch._id, items);
            return { ticket, rootUser, branchMaster, normalBranch, client, services, dentist, dentist2, staffCustomerCase };
        });
    }
    static testCheckRoleInBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const checkUser = yield refs_1.CreateUserService.create(rootUser._id, 'Normal', 'normal@gmail.com', '0999999', 'password');
            return { rootUser, branchMaster, normalBranch, checkUser };
        });
    }
    static testCreateCalendarDentist() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootUser, branchMaster, normalBranch } = yield this.createNormalBranch();
            const dentist = yield refs_1.CreateUserService.create(rootUser._id, 'Dentist', 'dentist@gmail.com', '0999999', 'password');
            yield refs_1.SetRoleInBranchService.set(dentist._id, normalBranch._id, [refs_1.Role.DENTIST]);
            yield refs_1.CreateUserService.create(rootUser._id, 'Staff', 'staff@gmail.com', '0999999111', 'password');
            const staff = yield refs_1.LoginService.login('staff@gmail.com', 'password');
            yield refs_1.SetRoleInBranchService.set(staff._id, normalBranch._id, [refs_1.Role.CUSTOMER_CARE]);
            return { rootUser, branchMaster, normalBranch, staff, dentist };
        });
    }
}
exports.InititalDatabaseForTest = InititalDatabaseForTest;