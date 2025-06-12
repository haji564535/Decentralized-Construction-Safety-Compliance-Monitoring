import { describe, it, expect, beforeEach } from "vitest"

describe("Safety Manager Contract", () => {
  // Mock functions to simulate contract calls
  const mockTxSender = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
  const mockManager = "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
  const mockAdmin = mockTxSender
  
  const safetyManagerContract = {
    admin: mockAdmin,
    safetyManagers: new Map(),
    
    registerSafetyManager(manager, name, certificationId, expiration) {
      if (mockTxSender !== this.admin) {
        return { type: "err", value: 403 }
      }
      
      this.safetyManagers.set(manager, {
        name,
        certificationId,
        expiration,
        active: true,
      })
      
      return { type: "ok", value: true }
    },
    
    deactivateSafetyManager(manager) {
      if (mockTxSender !== this.admin) {
        return { type: "err", value: 403 }
      }
      
      if (!this.safetyManagers.has(manager)) {
        return { type: "err", value: 404 }
      }
      
      const managerData = this.safetyManagers.get(manager)
      managerData.active = false
      this.safetyManagers.set(manager, managerData)
      
      return { type: "ok", value: true }
    },
    
    isManagerValid(manager) {
      if (!this.safetyManagers.has(manager)) {
        return false
      }
      
      const managerData = this.safetyManagers.get(manager)
      return managerData.active && managerData.expiration > 100 // Mock block height is 100
    },
    
    getManagerDetails(manager) {
      return this.safetyManagers.has(manager) ? this.safetyManagers.get(manager) : null
    },
    
    transferAdmin(newAdmin) {
      if (mockTxSender !== this.admin) {
        return { type: "err", value: 403 }
      }
      
      this.admin = newAdmin
      return { type: "ok", value: true }
    },
  }
  
  beforeEach(() => {
    // Reset the contract state before each test
    safetyManagerContract.admin = mockAdmin
    safetyManagerContract.safetyManagers = new Map()
  })
  
  it("should register a safety manager", () => {
    const result = safetyManagerContract.registerSafetyManager(mockManager, "John Doe", "CERT123", 200)
    
    expect(result.type).toBe("ok")
    expect(safetyManagerContract.safetyManagers.has(mockManager)).toBe(true)
    
    const managerData = safetyManagerContract.getManagerDetails(mockManager)
    expect(managerData.name).toBe("John Doe")
    expect(managerData.certificationId).toBe("CERT123")
    expect(managerData.active).toBe(true)
  })
  
  it("should validate manager correctly", () => {
    safetyManagerContract.registerSafetyManager(mockManager, "John Doe", "CERT123", 200)
    
    expect(safetyManagerContract.isManagerValid(mockManager)).toBe(true)
    
    // Deactivate the manager
    safetyManagerContract.deactivateSafetyManager(mockManager)
    expect(safetyManagerContract.isManagerValid(mockManager)).toBe(false)
  })
  
  it("should not allow non-admin to register managers", () => {
    safetyManagerContract.admin = "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP" // Different admin
    
    const result = safetyManagerContract.registerSafetyManager(mockManager, "John Doe", "CERT123", 200)
    
    expect(result.type).toBe("err")
    expect(result.value).toBe(403)
  })
  
  it("should transfer admin rights", () => {
    const newAdmin = "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP"
    
    const result = safetyManagerContract.transferAdmin(newAdmin)
    
    expect(result.type).toBe("ok")
    expect(safetyManagerContract.admin).toBe(newAdmin)
  })
})
