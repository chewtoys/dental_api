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
const refs_1 = require("../../refs");
class CreateBranchService {
    static validate(userId, name, email, phone, city, district, address, isMaster) {
        return __awaiter(this, void 0, void 0, function* () {
            refs_1.mustBeObjectId(userId);
            // Must Exist
            refs_1.mustExist(name, refs_1.BranchError.NAME_MUST_BE_PROVIDED);
            // Make Sure
            if (isMaster) {
                const isMasterCheck = yield refs_1.Branch.count({ isMaster: true });
                refs_1.makeSure(isMasterCheck === 0, refs_1.BranchError.ONLY_ONE_MASTER_BRANCH);
            }
            email = email ? email : undefined;
            if (email) {
                refs_1.makeSure(refs_1.validateEmail(email), refs_1.BranchError.EMAIL_INCORRECT);
                const checkUniqueEmail = yield refs_1.Branch.count({ email });
                refs_1.makeSure(checkUniqueEmail === 0, refs_1.BranchError.EMAIL_IS_EXISTED);
            }
            phone = phone ? phone : undefined;
            if (phone) {
                const checkUniquePhone = yield refs_1.Branch.count({ phone });
                refs_1.makeSure(checkUniquePhone === 0, refs_1.BranchError.PHONE_IS_EXISTED);
            }
            const checkUniqueName = yield refs_1.Branch.count({ name });
            refs_1.makeSure(checkUniqueName === 0, refs_1.BranchError.NAME_IS_EXISTED);
        });
    }
    static getSid() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxSid = yield refs_1.Branch.find({}).sort({ sid: -1 }).limit(1);
            if (maxSid.length === 0)
                return refs_1.SID_START_AT;
            return maxSid[0].sid + 1;
        });
    }
    static create(userId, name, email, phone, city, district, address, isMaster) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate(userId, name, email, phone, city, district, address, isMaster);
            email = email ? email : undefined;
            phone = phone ? phone : undefined;
            const sid = yield this.getSid();
            const branch = new refs_1.Branch({
                sid, name, email, phone, city, district, address, isMaster, createBy: userId
            });
            yield branch.save();
            return branch;
        });
    }
}
exports.CreateBranchService = CreateBranchService;
