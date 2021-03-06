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
const refs_1 = require("../../../src/refs");
class GetBranchDetailDataService {
    static get(branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const branchDb = yield refs_1.Branch.findById(branchId);
            let branch = branchDb.toObject();
            // Get Employees
            let employees = yield refs_1.GetAllEmployeesService.getEmployeeInOneBranch(branchId);
            employees = employees ? employees : [];
            branch.detail = { employees };
            return branch;
        });
    }
}
exports.GetBranchDetailDataService = GetBranchDetailDataService;
