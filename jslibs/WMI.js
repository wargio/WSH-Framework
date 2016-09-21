if (typeof console == 'undefined')
    throw new Error("Missing require default.js");

WMI = (function() {
    var _locator = new ActiveXObject("WbemScripting.SWbemLocator");
    return function(computer) {
        if (!computer)
            computer = '.';
        var service = _locator.ConnectServer(computer, "root\\cimv2");
        this.Controller1394 = [];
        this.Controller1394Device = [];
        this.Fan = [];
        this.HeatPipe = [];
        this.Refrigeration = [];
        this.TemperatureProbe = [];
        this.AssociatedProcessorMemory = [];
        this.AutochkSetting = [];
        this.BaseBoard = [];
        this.Battery = [];
        this.BIOS = [];
        this.Bus = [];
        this.CacheMemory = [];
        this.CDROMDrive = [];
        this.CIMLogicalDeviceCIMDataFile = [];
        this.ComputerSystemProcessor = [];
        this.CurrentProbe = [];
        this.DesktopMonitor = [];
        this.DeviceBus = [];
        this.DeviceChangeEvent = [];
        this.DeviceMemoryAddress = [];
        this.DeviceSettings = [];
        this.DiskDrive = [];
        this.DiskDriveToDiskPartition = [];
        this.DiskPartition = [];
        this.DisplayControllerConfiguration = [];
        this.DMAChannel = [];
        this.DriverForDevice = [];
        this.FloppyController = [];
        this.FloppyDrive = [];
        this.IDEController = [];
        this.IDEControllerDevice = [];
        this.InfraredDevice = [];
        this.IRQResource = [];
        this.Keyboard = [];
        this.LogicalDisk = [];
        this.LogicalDiskRootDirectory = [];
        this.LogicalDiskToPartition = [];
        this.LogicalProgramGroup = [];
        this.LogicalProgramGroupDirectory = [];
        this.LogicalProgramGroupItem = [];
        this.LogicalProgramGroupItemDataFile = [];
        this.MappedLogicalDisk = [];
        this.MemoryArray = [];
        this.MemoryArrayLocation = [];
        this.MemoryDevice = [];
        this.MemoryDeviceArray = [];
        this.MemoryDeviceLocation = [];
        this.MotherboardDevice = [];
        this.NetworkAdapter = [];
        this.NetworkAdapterConfiguration = [];
        this.NetworkAdapterSetting = [];
        this.NetworkClient = [];
        this.NetworkConnection = [];
        this.NetworkLoginProfile = [];
        this.NetworkProtocol = [];
        this.NTLogEvent = [];
        this.OnBoardDevice = [];
        this.OperatingSystem = [];
        this.ParallelPort = [];
        this.PCMCIAController = [];
        this.PhysicalMemory = [];
        this.PhysicalMemoryArray = [];
        this.PhysicalMemoryLocation = [];
        this.PnPAllocatedResource = [];
        this.PnPDevice = [];
        this.PnPDeviceProperty = [];
        this.PnPDevicePropertyUint8 = [];
        this.PnPDevicePropertyUint16 = [];
        this.PnPDevicePropertyUint32 = [];
        this.PnPDevicePropertyUint64 = [];
        this.PnPDevicePropertySint8 = [];
        this.PnPDevicePropertySint16 = [];
        this.PnPDevicePropertySint32 = [];
        this.PnPDevicePropertySint64 = [];
        this.PnPDevicePropertyString = [];
        this.PnPDevicePropertyBoolean = [];
        this.PnPDevicePropertyReal32 = [];
        this.PnPDevicePropertyReal64 = [];
        this.PnPDevicePropertyDateTime = [];
        this.PnPDevicePropertySecurityDescriptor = [];
        this.PnPDevicePropertyBinary = [];
        this.PnPDevicePropertyUint16Array = [];
        this.PnPDevicePropertyUint32Array = [];
        this.PnPDevicePropertyUint64Array = [];
        this.PnPDevicePropertySint8Array = [];
        this.PnPDevicePropertySint16Array = [];
        this.PnPDevicePropertySint32Array = [];
        this.PnPDevicePropertySint64Array = [];
        this.PnPDevicePropertyStringArray = [];
        this.PnPDevicePropertyBooleanArray = [];
        this.PnPDevicePropertyReal32Array = [];
        this.PnPDevicePropertyReal64Array = [];
        this.PnPDevicePropertyDateTimeArray = [];
        this.PnPDevicePropertySecurityDescriptorArray = [];
        this.PnPEntity = [];
        this.PointingDevice = [];
        this.PortableBattery = [];
        this.PortConnector = [];
        this.PortResource = [];
        this.POTSModem = [];
        this.POTSModemToSerialPort = [];
        this.Printer = [];
        this.PrinterConfiguration = [];
        this.PrinterController = [];
        this.PrinterDriver = [];
        this.PrinterDriverDll = [];
        this.PrinterSetting = [];
        this.PrinterShare = [];
        this.PrintJob = [];
        this.Processor = [];
        this.SCSIController = [];
        this.SCSIControllerDevice = [];
        this.SerialPort = [];
        this.SerialPortConfiguration = [];
        this.SerialPortSetting = [];
        this.SMBIOSMemory = [];
        this.SoundDevice = [];
        this.TapeDrive = [];
        this.TCPIPPrinterPort = [];
        this.USBController = [];
        this.USBControllerDevice = [];
        this.VideoController = [];
        this.VideoSettings = [];
        this.VoltageProbe = [];
        this.print = function(what) {
            var printdev = function(device, who) {
                if (who.length > 0) {
                    console.log(device + " size: " + who.length);
                    for (var i = 0; i < who.length; i++) {
                        console.log("  " + device + ": " + i);
                        var max = 0,
                            pad = '                                         ';
                        for (var entry in who[i]) {
                            if (max < entry.length)
                                max = entry.length;
                        }
                        for (var entry in who[i]) {
                            console.log("    " + entry + ": " + pad.substr(0, max - entry.length) + who[i][entry]);
                        }
                    }
                    console.log(" ");
                }
            }
            if (!what) {
                for (var device in this) {
                    if (typeof this[device] != "function")
                        printdev(device, this[device]);
                }
            } else if (this[what]) {
                printdev(what, this[what]);
            } else
                throw new Error("Unknown element: " + what);
        }
        this.load = function(what) {
            var PnPDevicePropertyType = function(type) {
                var array = [];
                var e = new Enumerator(service.ExecQuery("Select * from Win32_PnPDeviceProperty" + type, null, 48));
                e.moveFirst();
                while (!e.atEnd()) {
                    var o = e.item();
                    array.push({
                        data: o.Data,
                        deviceID: o.DeviceID,
                        key: o.Key,
                        keyName: o.KeyName,
                        type: o.Type
                    });
                    e.moveNext();
                }
                return array;
            }
            var choose = {
                Controller1394: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_1394Controller", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Controller1394Device: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_1394ControllerDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessState: o.AccessState,
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Fan: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Fan", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            activeCooling: o.ActiveCooling,
                            availability: o.Availability,
                            deviceID: o.DeviceID,
                            name: o.Name,
                            statusInfo: o.StatusInfo
                        });
                        e.moveNext();
                    }
                    return array;
                },
                HeatPipe: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_HeatPipe", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            activeCooling: o.ActiveCooling,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Refrigeration: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Refrigeration", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            activeCooling: o.ActiveCooling,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                TemperatureProbe: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_TemperatureProbe", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accuracy: o.Accuracy,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            currentReading: o.CurrentReading,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            isLinear: o.IsLinear,
                            lastErrorCode: o.LastErrorCode,
                            lowerThresholdCritical: o.LowerThresholdCritical,
                            lowerThresholdFatal: o.LowerThresholdFatal,
                            lowerThresholdNonCritical: o.LowerThresholdNonCritical,
                            maxReadable: o.MaxReadable,
                            minReadable: o.MinReadable,
                            name: o.Name,
                            nominalReading: o.NominalReading,
                            normalMax: o.NormalMax,
                            normalMin: o.NormalMin,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            resolution: o.Resolution,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            tolerance: o.Tolerance,
                            upperThresholdCritical: o.UpperThresholdCritical,
                            upperThresholdFatal: o.UpperThresholdFatal,
                            upperThresholdNonCritical: o.UpperThresholdNonCritical
                        });
                        e.moveNext();
                    }
                    return array;
                },
                AssociatedProcessorMemory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_AssociatedProcessorMemory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            activeCooling: o.Antecedent,
                            availability: o.BusSpeed,
                            deviceID: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                AutochkSetting: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_AutochkSetting", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            description: o.Description,
                            settingID: o.SettingID,
                            userInputDelay: o.UserInputDelay
                        });
                        e.moveNext();
                    }
                    return array;
                },
                BaseBoard: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_BaseBoard", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            configOptions: o.ConfigOptions,
                            creationClassName: o.CreationClassName,
                            depth: o.Depth,
                            description: o.Description,
                            height: o.Height,
                            hostingBoard: o.HostingBoard,
                            hotSwappable: o.HotSwappable,
                            installDate: o.InstallDate,
                            manufacturer: o.Manufacturer,
                            model: o.Model,
                            name: o.Name,
                            otherIdentifyingInfo: o.OtherIdentifyingInfo,
                            partNumber: o.PartNumber,
                            poweredOn: o.PoweredOn,
                            product: o.Product,
                            removable: o.Removable,
                            replaceable: o.Replaceable,
                            requirementsDescription: o.RequirementsDescription,
                            requiresDaughterBoard: o.RequiresDaughterBoard,
                            serialNumber: o.SerialNumber,
                            sku: o.SKU,
                            slotLayout: o.SlotLayout,
                            specialRequirements: o.SpecialRequirements,
                            status: o.Status,
                            tag: o.Tag,
                            version: o.Version,
                            weight: o.Weight,
                            width: o.Width
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Battery: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Battery", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            batteryRechargeTime: o.BatteryRechargeTime,
                            batteryStatus: o.BatteryStatus,
                            caption: o.Caption,
                            chemistry: o.Chemistry,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            designCapacity: o.DesignCapacity,
                            designVoltage: o.DesignVoltage,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            estimatedChargeRemaining: o.EstimatedChargeRemaining,
                            estimatedRunTime: o.EstimatedRunTime,
                            expectedBatteryLife: o.ExpectedBatteryLife,
                            expectedLife: o.ExpectedLife,
                            fullChargeCapacity: o.FullChargeCapacity,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maxRechargeTime: o.MaxRechargeTime,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            smartBatteryVersion: o.SmartBatteryVersion,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOnBattery: o.TimeOnBattery,
                            timeToFullCharge: o.TimeToFullCharge
                        });
                        e.moveNext();
                    }
                    return array;
                },
                BIOS: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_BIOS", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            biosCharacteristics: o.BiosCharacteristics,
                            buildNumber: o.BuildNumber,
                            caption: o.Caption,
                            codeSet: o.CodeSet,
                            currentLanguage: o.CurrentLanguage,
                            description: o.Description,
                            identificationCode: o.IdentificationCode,
                            installableLanguages: o.InstallableLanguages,
                            installDate: o.InstallDate,
                            languageEdition: o.LanguageEdition,
                            listOfLanguages: o.ListOfLanguages,
                            manufacturer: o.Manufacturer,
                            name: o.Name,
                            otherTargetOS: o.OtherTargetOS,
                            primaryBIOS: o.PrimaryBIOS,
                            releaseDate: o.ReleaseDate,
                            serialNumber: o.SerialNumber,
                            smbiosBIOSVersion: o.SMBIOSBIOSVersion,
                            smbiosMajorVersion: o.SMBIOSMajorVersion,
                            smbiosMinorVersion: o.SMBIOSMinorVersion,
                            smbiosPresent: o.SMBIOSPresent,
                            softwareElementID: o.SoftwareElementID,
                            softwareElementState: o.SoftwareElementState,
                            status: o.Status,
                            targetOperatingSystem: o.TargetOperatingSystem,
                            version: o.Version
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Bus: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Bus", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            busNum: o.BusNum,
                            busType: o.BusType,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                CacheMemory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_CacheMemory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            additionalErrorData: o.AdditionalErrorData,
                            associativity: o.Associativity,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            cacheSpeed: o.CacheSpeed,
                            cacheType: o.CacheType,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            correctableError: o.CorrectableError,
                            creationClassName: o.CreationClassName,
                            currentSRAM: o.CurrentSRAM,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            endingAddress: o.EndingAddress,
                            errorAccess: o.ErrorAccess,
                            errorAddress: o.ErrorAddress,
                            errorCleared: o.ErrorCleared,
                            errorCorrectType: o.ErrorCorrectType,
                            errorData: o.ErrorData,
                            errorDataOrder: o.ErrorDataOrder,
                            errorDescription: o.ErrorDescription,
                            errorInfo: o.ErrorInfo,
                            errorMethodology: o.ErrorMethodology,
                            errorResolution: o.ErrorResolution,
                            errorTime: o.ErrorTime,
                            errorTransferSize: o.ErrorTransferSize,
                            flushTimer: o.FlushTimer,
                            installDate: o.InstallDate,
                            installedSize: o.InstalledSize,
                            lastErrorCode: o.LastErrorCode,
                            level: o.Level,
                            lineSize: o.LineSize,
                            location: o.Location,
                            maxCacheSize: o.MaxCacheSize,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            otherErrorDescription: o.OtherErrorDescription,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            purpose: o.Purpose,
                            readPolicy: o.ReadPolicy,
                            replacementPolicy: o.ReplacementPolicy,
                            startingAddress: o.StartingAddress,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            supportedSRAM: o.SupportedSRAM,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemLevelAddress: o.SystemLevelAddress,
                            systemName: o.SystemName,
                            writePolicy: o.WritePolicy
                        });
                        e.moveNext();
                    }
                    return array;
                },
                CDROMDrive: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_CDROMDrive", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            compressionMethod: o.CompressionMethod,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            defaultBlockSize: o.DefaultBlockSize,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            drive: o.Drive,
                            driveIntegrity: o.DriveIntegrity,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            fileSystemFlags: o.FileSystemFlags,
                            fileSystemFlagsEx: o.FileSystemFlagsEx,
                            id: o.Id,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxBlockSize: o.MaxBlockSize,
                            maximumComponentLength: o.MaximumComponentLength,
                            maxMediaSize: o.MaxMediaSize,
                            mediaLoaded: o.MediaLoaded,
                            mediaType: o.MediaType,
                            minBlockSize: o.MinBlockSize,
                            name: o.Name,
                            needsCleaning: o.NeedsCleaning,
                            numberOfMediaSupported: o.NumberOfMediaSupported,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            revisionLevel: o.RevisionLevel,
                            scsiBus: o.SCSIBus,
                            scsiLogicalUnit: o.SCSILogicalUnit,
                            scsiPort: o.SCSIPort,
                            scsiTargetId: o.SCSITargetId,
                            size: o.Size,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            transferRate: o.TransferRate,
                            volumeName: o.VolumeName,
                            volumeSerialNumber: o.VolumeSerialNumber
                        });
                        e.moveNext();
                    }
                    return array;
                },
                CIMLogicalDeviceCIMDataFile: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_CIMLogicalDeviceCIMDataFile", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            purpose: o.Purpose,
                            purposeDescription: o.PurposeDescription
                        });
                        e.moveNext();
                    }
                    return array;
                },
                ComputerSystemProcessor: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_ComputerSystemProcessor", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            groupComponent: o.GroupComponent,
                            partComponent: o.PartComponent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                CurrentProbe: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_CurrentProbe", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accuracy: o.Accuracy,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            currentReading: o.CurrentReading,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            isLinear: o.IsLinear,
                            lastErrorCode: o.LastErrorCode,
                            lowerThresholdCritical: o.LowerThresholdCritical,
                            lowerThresholdFatal: o.LowerThresholdFatal,
                            lowerThresholdNonCritical: o.LowerThresholdNonCritical,
                            maxReadable: o.MaxReadable,
                            minReadable: o.MinReadable,
                            name: o.Name,
                            nominalReading: o.NominalReading,
                            normalMax: o.NormalMax,
                            normalMin: o.NormalMin,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            resolution: o.Resolution,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            tolerance: o.Tolerance,
                            upperThresholdCritical: o.UpperThresholdCritical,
                            upperThresholdFatal: o.UpperThresholdFatal,
                            upperThresholdNonCritical: o.UpperThresholdNonCritical
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DesktopMonitor: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DesktopMonitor", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            bandwidth: o.Bandwidth,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            displayType: o.DisplayType,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            isLocked: o.IsLocked,
                            lastErrorCode: o.LastErrorCode,
                            monitorManufacturer: o.MonitorManufacturer,
                            monitorType: o.MonitorType,
                            name: o.Name,
                            pixelsPerXLogicalInch: o.PixelsPerXLogicalInch,
                            pixelsPerYLogicalInch: o.PixelsPerYLogicalInch,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            screenHeight: o.ScreenHeight,
                            screenWidth: o.ScreenWidth,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DeviceBus: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DeviceBus", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DeviceChangeEvent: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DeviceChangeEvent", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            securityDescriptor: o.SECURITY_DESCRIPTOR,
                            timeCreated: o.TIME_CREATED,
                            eventType: o.EventType
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DeviceMemoryAddress: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DeviceMemoryAddress", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            csCreationClassName: o.CSCreationClassName,
                            csName: o.CSName,
                            description: o.Description,
                            endingAddress: o.EndingAddress,
                            installDate: o.InstallDate,
                            memoryType: o.MemoryType,
                            name: o.Name,
                            startingAddress: o.StartingAddress,
                            status: o.Status
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DeviceSettings: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DeviceSettings", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            setting: o.Setting,
                            element: o.Element
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DiskDrive: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DiskDrive", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            bytesPerSector: o.BytesPerSector,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            compressionMethod: o.CompressionMethod,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            defaultBlockSize: o.DefaultBlockSize,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            index: o.Index,
                            installDate: o.InstallDate,
                            interfaceType: o.InterfaceType,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxBlockSize: o.MaxBlockSize,
                            maxMediaSize: o.MaxMediaSize,
                            mediaLoaded: o.MediaLoaded,
                            mediaType: o.MediaType,
                            minBlockSize: o.MinBlockSize,
                            model: o.Model,
                            name: o.Name,
                            needsCleaning: o.NeedsCleaning,
                            numberOfMediaSupported: o.NumberOfMediaSupported,
                            partitions: o.Partitions,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            scsiBus: o.SCSIBus,
                            scsiLogicalUnit: o.SCSILogicalUnit,
                            scsiPort: o.SCSIPort,
                            scsiTargetId: o.SCSITargetId,
                            sectorsPerTrack: o.SectorsPerTrack,
                            size: o.Size,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            totalCylinders: o.TotalCylinders,
                            totalHeads: o.TotalHeads,
                            totalSectors: o.TotalSectors,
                            totalTracks: o.TotalTracks,
                            tracksPerCylinder: o.TracksPerCylinder
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DiskDriveToDiskPartition: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DiskDriveToDiskPartition", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DiskPartition: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DiskPartition", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            bootable: o.Bootable,
                            bootPartition: o.BootPartition,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            diskIndex: o.DiskIndex,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            hiddenSectors: o.HiddenSectors,
                            index: o.Index,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            primaryPartition: o.PrimaryPartition,
                            purpose: o.Purpose,
                            rewritePartition: o.RewritePartition,
                            size: o.Size,
                            startingOffset: o.StartingOffset,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            type: o.Type
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DisplayControllerConfiguration: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DisplayControllerConfiguration", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            bitsPerPixel: o.BitsPerPixel,
                            caption: o.Caption,
                            colorPlanes: o.ColorPlanes,
                            description: o.Description,
                            deviceEntriesInAColorTable: o.DeviceEntriesInAColorTable,
                            deviceSpecificPens: o.DeviceSpecificPens,
                            horizontalResolution: o.HorizontalResolution,
                            name: o.Name,
                            refreshRate: o.RefreshRate,
                            reservedSystemPaletteEntries: o.ReservedSystemPaletteEntries,
                            settingID: o.SettingID,
                            systemPaletteEntries: o.SystemPaletteEntries,
                            verticalResolution: o.VerticalResolution,
                            videoMode: o.VideoMode
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DMAChannel: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DMAChannel", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            addressSize: o.AddressSize,
                            availability: o.Availability,
                            burstMode: o.BurstMode,
                            byteMode: o.ByteMode,
                            caption: o.Caption,
                            channelTiming: o.ChannelTiming,
                            creationClassName: o.CreationClassName,
                            csCreationClassName: o.CSCreationClassName,
                            csName: o.CSName,
                            description: o.Description,
                            dmaChannel: o.DMAChannel,
                            installDate: o.InstallDate,
                            maxTransferSize: o.MaxTransferSize,
                            name: o.Name,
                            port: o.Port,
                            status: o.Status,
                            transferWidths: o.TransferWidths,
                            typeCTiming: o.TypeCTiming,
                            wordMode: o.WordMode
                        });
                        e.moveNext();
                    }
                    return array;
                },
                DriverForDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_DriverForDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                FloppyController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_FloppyController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                FloppyDrive: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_FloppyDrive", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                IDEController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_IDEController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                IDEControllerDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_IDEControllerDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            accessState: o.AccessState,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                InfraredDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_InfraredDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                IRQResource: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_IRQResource", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            csCreationClassName: o.CSCreationClassName,
                            csName: o.CSName,
                            description: o.Description,
                            hardware: o.Hardware,
                            installDate: o.InstallDate,
                            irqNumber: o.IRQNumber >>> 0,
                            name: o.Name,
                            shareable: o.Shareable,
                            status: o.Status,
                            triggerLevel: o.TriggerLevel,
                            triggerType: o.TriggerType,
                            vector: o.Vector >>> 0
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Keyboard: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Keyboard", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            isLocked: o.IsLocked,
                            lastErrorCode: o.LastErrorCode,
                            layout: o.Layout,
                            name: o.Name,
                            numberOfFunctionKeys: o.NumberOfFunctionKeys,
                            password: o.Password,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalDisk: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalDisk", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            caption: o.Caption,
                            compressed: o.Compressed,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            driveType: o.DriveType,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            fileSystem: o.FileSystem,
                            freeSpace: o.FreeSpace,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maximumComponentLength: o.MaximumComponentLength,
                            mediaType: o.MediaType,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            providerName: o.ProviderName,
                            purpose: o.Purpose,
                            size: o.Size,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            supportsFileBasedCompression: o.SupportsFileBasedCompression,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            volumeName: o.VolumeName,
                            volumeSerialNumber: o.VolumeSerialNumber
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalDiskRootDirectory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalDiskRootDirectory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            groupComponent: o.GroupComponent,
                            partComponent: o.PartComponent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalDiskToPartition: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalDiskToPartition", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            endingAddress: o.EndingAddress,
                            startingAddress: o.StartingAddress
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalProgramGroup: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalProgramGroup", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            description: o.Description,
                            groupName: o.GroupName,
                            installDate: o.InstallDate,
                            name: o.Name,
                            status: o.Status,
                            userName: o.UserName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalProgramGroupDirectory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalProgramGroupDirectory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalProgramGroupItem: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalProgramGroupItem", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            description: o.Description,
                            installDate: o.InstallDate,
                            name: o.Name,
                            status: o.Status
                        });
                        e.moveNext();
                    }
                    return array;
                },
                LogicalProgramGroupItemDataFile: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_LogicalProgramGroupItemDataFile", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MappedLogicalDisk: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MappedLogicalDisk", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            caption: o.Caption,
                            compressed: o.Compressed,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            fileSystem: o.FileSystem,
                            freeSpace: o.FreeSpace,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maximumComponentLength: o.MaximumComponentLength,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            providerName: o.ProviderName,
                            purpose: o.Purpose,
                            quotasDisabled: o.QuotasDisabled,
                            quotasIncomplete: o.QuotasIncomplete,
                            quotasRebuilding: o.QuotasRebuilding,
                            sessionID: o.SessionID,
                            size: o.Size,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            supportsDiskQuotas: o.SupportsDiskQuotas,
                            supportsFileBasedCompression: o.SupportsFileBasedCompression,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            volumeName: o.VolumeName,
                            volumeSerialNumber: o.VolumeSerialNumber
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MemoryArray: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MemoryArray", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            additionalErrorData: o.AdditionalErrorData,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            correctableError: o.CorrectableError,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            endingAddress: o.EndingAddress,
                            errorAccess: o.ErrorAccess,
                            errorAddress: o.ErrorAddress,
                            errorCleared: o.ErrorCleared,
                            errorData: o.ErrorData,
                            errorDataOrder: o.ErrorDataOrder,
                            errorDescription: o.ErrorDescription,
                            errorGranularity: o.ErrorGranularity,
                            errorInfo: o.ErrorInfo,
                            errorMethodology: o.ErrorMethodology,
                            errorResolution: o.ErrorResolution,
                            errorTime: o.ErrorTime,
                            errorTransferSize: o.ErrorTransferSize,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            otherErrorDescription: o.OtherErrorDescription,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            purpose: o.Purpose,
                            startingAddress: o.StartingAddress,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemLevelAddress: o.SystemLevelAddress,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MemoryArrayLocation: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MemoryArrayLocation", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MemoryDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MemoryDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            additionalErrorData: o.AdditionalErrorData,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            correctableError: o.CorrectableError,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            endingAddress: o.EndingAddress,
                            errorAccess: o.ErrorAccess,
                            errorAddress: o.ErrorAddress,
                            errorCleared: o.ErrorCleared,
                            errorData: o.ErrorData,
                            errorDataOrder: o.ErrorDataOrder,
                            errorDescription: o.ErrorDescription,
                            errorGranularity: o.ErrorGranularity,
                            errorInfo: o.ErrorInfo,
                            errorMethodology: o.ErrorMethodology,
                            errorResolution: o.ErrorResolution,
                            errorTime: o.ErrorTime,
                            errorTransferSize: o.ErrorTransferSize,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            otherErrorDescription: o.OtherErrorDescription,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            purpose: o.Purpose,
                            startingAddress: o.StartingAddress,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemLevelAddress: o.SystemLevelAddress,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MemoryDeviceArray: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MemoryDeviceArray", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            groupComponent: o.GroupComponent,
                            partComponent: o.PartComponent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MemoryDeviceLocation: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MemoryDeviceLocation", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                MotherboardDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_MotherboardDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            primaryBusType: o.PrimaryBusType,
                            revisionNumber: o.RevisionNumber,
                            secondaryBusType: o.SecondaryBusType,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkAdapter: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkAdapter", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            adapterType: o.AdapterType,
                            autoSense: o.AutoSense,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            index: o.Index,
                            installDate: o.InstallDate,
                            installed: o.Installed,
                            lastErrorCode: o.LastErrorCode,
                            macAddress: o.MACAddress,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            maxSpeed: o.MaxSpeed,
                            name: o.Name,
                            networkAddresses: o.NetworkAddresses,
                            permanentAddress: o.PermanentAddress,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            productName: o.ProductName,
                            serviceName: o.ServiceName,
                            speed: o.Speed,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkAdapterConfiguration: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkAdapterConfiguration", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            arpAlwaysSourceRoute: o.ArpAlwaysSourceRoute,
                            arpUseEtherSNAP: o.ArpUseEtherSNAP,
                            caption: o.Caption,
                            databasePath: o.DatabasePath,
                            deadGWDetectEnabled: o.DeadGWDetectEnabled,
                            defaultIPGateway: o.DefaultIPGateway,
                            defaultTOS: o.DefaultTOS,
                            defaultTTL: o.DefaultTTL,
                            description: o.Description,
                            dhcpEnabled: o.DHCPEnabled,
                            dhcpLeaseExpires: o.DHCPLeaseExpires,
                            dhcpLeaseObtained: o.DHCPLeaseObtained,
                            dHCPServer: o.DHCPServer,
                            dnsDomain: o.DNSDomain,
                            dnsDomainSuffixSearchOrder: o.DNSDomainSuffixSearchOrder,
                            dnsEnabledForWINSResolution: o.DNSEnabledForWINSResolution,
                            dnsHostName: o.DNSHostName,
                            dnsServerSearchOrder: o.DNSServerSearchOrder,
                            domainDNSRegistrationEnabled: o.DomainDNSRegistrationEnabled,
                            forwardBufferMemory: o.ForwardBufferMemory,
                            fullDNSRegistrationEnabled: o.FullDNSRegistrationEnabled,
                            gatewayCostMetric: o.GatewayCostMetric,
                            iGMPLevel: o.IGMPLevel,
                            index: o.Index,
                            ipAddress: o.IPAddress,
                            ipConnectionMetric: o.IPConnectionMetric,
                            ipEnabled: o.IPEnabled,
                            ipFilterSecurityEnabled: o.IPFilterSecurityEnabled,
                            ipPortSecurityEnabled: o.IPPortSecurityEnabled,
                            ipSecPermitIPProtocols: o.IPSecPermitIPProtocols,
                            ipSecPermitTCPPorts: o.IPSecPermitTCPPorts,
                            ipSecPermitUDPPorts: o.IPSecPermitUDPPorts,
                            ipSubnet: o.IPSubnet,
                            ipUseZeroBroadcast: o.IPUseZeroBroadcast,
                            ipXAddress: o.IPXAddress,
                            ipXEnabled: o.IPXEnabled,
                            ipXFrameType: o.IPXFrameType,
                            ipXMediaType: o.IPXMediaType,
                            ipXNetworkNumber: o.IPXNetworkNumber,
                            ipXVirtualNetNumber: o.IPXVirtualNetNumber,
                            keepAliveInterval: o.KeepAliveInterval,
                            keepAliveTime: o.KeepAliveTime,
                            macAddress: o.MACAddress,
                            mtu: o.MTU,
                            numForwardPackets: o.NumForwardPackets,
                            pmTUBHDetectEnabled: o.PMTUBHDetectEnabled,
                            pmTUDiscoveryEnabled: o.PMTUDiscoveryEnabled,
                            serviceName: o.ServiceName,
                            settingID: o.SettingID,
                            tcpipNetbiosOptions: o.TcpipNetbiosOptions,
                            tcpMaxConnectRetransmissions: o.TcpMaxConnectRetransmissions,
                            tcpMaxDataRetransmissions: o.TcpMaxDataRetransmissions,
                            tcpNumConnections: o.TcpNumConnections,
                            tcpUseRFC1122UrgentPointer: o.TcpUseRFC1122UrgentPointer,
                            tcpWindowSize: o.TcpWindowSize,
                            winsEnableLMHostsLookup: o.WINSEnableLMHostsLookup,
                            winsHostLookupFile: o.WINSHostLookupFile,
                            winsPrimaryServer: o.WINSPrimaryServer,
                            winsScopeID: o.WINSScopeID,
                            winsSecondaryServer: o.WINSSecondaryServer
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkAdapterSetting: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkAdapterSetting", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            setting: o.Setting,
                            element: o.Element
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkClient: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkClient", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            description: o.Description,
                            installDate: o.InstallDate,
                            manufacturer: o.Manufacturer,
                            name: o.Name,
                            status: o.Status
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkConnection: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkConnection", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessMask: o.AccessMask,
                            caption: o.Caption,
                            comment: o.Comment,
                            connectionState: o.ConnectionState,
                            connectionType: o.ConnectionType,
                            description: o.Description,
                            displayType: o.DisplayType,
                            installDate: o.InstallDate,
                            localName: o.LocalName,
                            name: o.Name,
                            persistent: o.Persistent,
                            providerName: o.ProviderName,
                            remoteName: o.RemoteName,
                            remotePath: o.RemotePath,
                            resourceType: o.ResourceType,
                            status: o.Status,
                            userName: o.UserName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkLoginProfile: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkLoginProfile", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accountExpires: o.AccountExpires,
                            authorizationFlags: o.AuthorizationFlags,
                            badPasswordCount: o.BadPasswordCount,
                            caption: o.Caption,
                            codePage: o.CodePage,
                            comment: o.Comment,
                            countryCode: o.CountryCode,
                            description: o.Description,
                            flags: o.Flags,
                            fullName: o.FullName,
                            homeDirectory: o.HomeDirectory,
                            homeDirectoryDrive: o.HomeDirectoryDrive,
                            lastLogoff: o.LastLogoff,
                            lastLogon: o.LastLogon,
                            logonHours: o.LogonHours,
                            logonServer: o.LogonServer,
                            maximumStorage: o.MaximumStorage,
                            name: o.Name,
                            numberOfLogons: o.NumberOfLogons,
                            parameters: o.Parameters,
                            passwordAge: o.PasswordAge,
                            passwordExpires: o.PasswordExpires,
                            primaryGroupId: o.PrimaryGroupId,
                            privileges: o.Privileges,
                            profile: o.Profile,
                            scriptPath: o.ScriptPath,
                            settingID: o.SettingID,
                            unitsPerWeek: o.UnitsPerWeek,
                            userComment: o.UserComment,
                            userId: o.UserId,
                            userType: o.UserType,
                            workstations: o.Workstations
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NetworkProtocol: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NetworkProtocol", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            connectionlessService: o.ConnectionlessService,
                            description: o.Description,
                            guaranteesDelivery: o.GuaranteesDelivery,
                            guaranteesSequencing: o.GuaranteesSequencing,
                            installDate: o.InstallDate,
                            maximumAddressSize: o.MaximumAddressSize,
                            maximumMessageSize: o.MaximumMessageSize,
                            messageOriented: o.MessageOriented,
                            minimumAddressSize: o.MinimumAddressSize,
                            name: o.Name,
                            pseudoStreamOriented: o.PseudoStreamOriented,
                            status: o.Status,
                            supportsBroadcasting: o.SupportsBroadcasting,
                            supportsConnectData: o.SupportsConnectData,
                            supportsDisconnectData: o.SupportsDisconnectData,
                            supportsEncryption: o.SupportsEncryption,
                            supportsExpeditedData: o.SupportsExpeditedData,
                            supportsFragmentation: o.SupportsFragmentation,
                            supportsGracefulClosing: o.SupportsGracefulClosing,
                            supportsGuaranteedBandwidth: o.SupportsGuaranteedBandwidth,
                            supportsMulticasting: o.SupportsMulticasting,
                            supportsQualityofService: o.SupportsQualityofService
                        });
                        e.moveNext();
                    }
                    return array;
                },
                NTLogEvent: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_NTLogEvent", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            category: o.Category,
                            categoryString: o.CategoryString,
                            computerName: o.ComputerName,
                            data: o.Data,
                            eventCode: o.EventCode,
                            eventIdentifier: o.EventIdentifier,
                            eventType: o.EventType,
                            insertionStrings: o.InsertionStrings,
                            logfile: o.Logfile,
                            message: o.Message,
                            recordNumber: o.RecordNumber,
                            sourceName: o.SourceName,
                            timeGenerated: o.TimeGenerated,
                            timeWritten: o.TimeWritten,
                            type: o.Type,
                            user: o.User
                        });
                        e.moveNext();
                    }
                    return array;
                },
                OnBoardDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_OnBoardDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceType: o.DeviceType,
                            enabled: o.Enabled,
                            hotSwappable: o.HotSwappable,
                            installDate: o.InstallDate,
                            manufacturer: o.Manufacturer,
                            model: o.Model,
                            name: o.Name,
                            otherIdentifyingInfo: o.OtherIdentifyingInfo,
                            partNumber: o.PartNumber,
                            poweredOn: o.PoweredOn,
                            removable: o.Removable,
                            replaceable: o.Replaceable,
                            serialNumber: o.SerialNumber,
                            sku: o.SKU,
                            status: o.Status,
                            tag: o.Tag,
                            version: o.Version
                        });
                        e.moveNext();
                    }
                    return array;
                },
                OperatingSystem: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_OperatingSystem", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            bootDevice: o.BootDevice,
                            buildNumber: o.BuildNumber,
                            buildType: o.BuildType,
                            caption: o.Caption,
                            codeSet: o.CodeSet,
                            countryCode: o.CountryCode,
                            creationClassName: o.CreationClassName,
                            cSCreationClassName: o.CSCreationClassName,
                            cSDVersion: o.CSDVersion,
                            cSName: o.CSName,
                            currentTimeZone: o.CurrentTimeZone,
                            debug: o.Debug,
                            description: o.Description,
                            distributed: o.Distributed,
                            foregroundApplicationBoost: o.ForegroundApplicationBoost,
                            freePhysicalMemory: o.FreePhysicalMemory,
                            freeSpaceInPagingFiles: o.FreeSpaceInPagingFiles,
                            freeVirtualMemory: o.FreeVirtualMemory,
                            installDate: o.InstallDate,
                            lastBootUpTime: o.LastBootUpTime,
                            localDateTime: o.LocalDateTime,
                            locale: o.Locale,
                            manufacturer: o.Manufacturer,
                            maxNumberOfProcesses: o.MaxNumberOfProcesses,
                            maxProcessMemorySize: o.MaxProcessMemorySize,
                            name: o.Name,
                            numberOfLicensedUsers: o.NumberOfLicensedUsers,
                            numberOfProcesses: o.NumberOfProcesses,
                            numberOfUsers: o.NumberOfUsers,
                            organization: o.Organization,
                            oSLanguage: o.OSLanguage,
                            oSProductSuite: o.OSProductSuite,
                            oSType: o.OSType,
                            otherTypeDescription: o.OtherTypeDescription,
                            plusProductID: o.PlusProductID,
                            plusVersionNumber: o.PlusVersionNumber,
                            primary: o.Primary,
                            quantumLength: o.QuantumLength,
                            quantumType: o.QuantumType,
                            registeredUser: o.RegisteredUser,
                            serialNumber: o.SerialNumber,
                            servicePackMajorVersion: o.ServicePackMajorVersion,
                            servicePackMinorVersion: o.ServicePackMinorVersion,
                            sizeStoredInPagingFiles: o.SizeStoredInPagingFiles,
                            status: o.Status,
                            systemDevice: o.SystemDevice,
                            systemDirectory: o.SystemDirectory,
                            totalSwapSpaceSize: o.TotalSwapSpaceSize,
                            totalVirtualMemorySize: o.TotalVirtualMemorySize,
                            totalVisibleMemorySize: o.TotalVisibleMemorySize,
                            version: o.Version,
                            windowsDirectory: o.WindowsDirectory
                        });
                        e.moveNext();
                    }
                    return array;
                },
                ParallelPort: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_ParallelPort", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            dmaSupport: o.DMASupport,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            osAutoDiscovered: o.OSAutoDiscovered,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PCMCIAController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PCMCIAController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PhysicalMemory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PhysicalMemory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            bankLabel: o.BankLabel,
                            capacity: o.Capacity,
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            dataWidth: o.DataWidth,
                            description: o.Description,
                            deviceLocator: o.DeviceLocator,
                            formFactor: o.FormFactor,
                            hotSwappable: o.HotSwappable,
                            installDate: o.InstallDate,
                            interleaveDataDepth: o.InterleaveDataDepth,
                            interleavePosition: o.InterleavePosition,
                            manufacturer: o.Manufacturer,
                            memoryType: o.MemoryType,
                            model: o.Model,
                            name: o.Name,
                            otherIdentifyingInfo: o.OtherIdentifyingInfo,
                            partNumber: o.PartNumber,
                            positionInRow: o.PositionInRow,
                            poweredOn: o.PoweredOn,
                            removable: o.Removable,
                            replaceable: o.Replaceable,
                            serialNumber: o.SerialNumber,
                            sku: o.SKU,
                            speed: o.Speed,
                            status: o.Status,
                            tag: o.Tag,
                            totalWidth: o.TotalWidth,
                            typeDetail: o.TypeDetail,
                            version: o.Version
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PhysicalMemoryArray: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PhysicalMemoryArray", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            depth: o.Depth,
                            description: o.Description,
                            height: o.Height,
                            hotSwappable: o.HotSwappable,
                            installDate: o.InstallDate,
                            location: o.Location,
                            manufacturer: o.Manufacturer,
                            maxCapacity: o.MaxCapacity,
                            memoryDevices: o.MemoryDevices,
                            memoryErrorCorrection: o.MemoryErrorCorrection,
                            model: o.Model,
                            name: o.Name,
                            otherIdentifyingInfo: o.OtherIdentifyingInfo,
                            partNumber: o.PartNumber,
                            poweredOn: o.PoweredOn,
                            removable: o.Removable,
                            replaceable: o.Replaceable,
                            serialNumber: o.SerialNumber,
                            sKU: o.SKU,
                            status: o.Status,
                            tag: o.Tag,
                            use: o.Use,
                            version: o.Version,
                            weight: o.Weight,
                            width: o.Width
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PhysicalMemoryLocation: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PhysicalMemoryLocation", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            groupComponent: o.GroupComponent,
                            partComponent: o.PartComponent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PnPAllocatedResource: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PnPAllocatedResource", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PnPDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PnPDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            sameElement: o.SameElement,
                            systemElement: o.SystemElement
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PnPDeviceProperty: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PnPDeviceProperty", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            deviceID: o.DeviceID,
                            key: o.Key,
                            keyName: o.KeyName,
                            type: o.Type
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PnPDevicePropertyUint8: function() {
                    return PnPDevicePropertyType('Uint8');
                },
                PnPDevicePropertyUint16: function() {
                    return PnPDevicePropertyType('Uint16');
                },
                PnPDevicePropertyUint32: function() {
                    return PnPDevicePropertyType('Uint32');
                },
                PnPDevicePropertyUint64: function() {
                    return PnPDevicePropertyType('Uint64');
                },
                PnPDevicePropertySint8: function() {
                    return PnPDevicePropertyType('Sint8');
                },
                PnPDevicePropertySint16: function() {
                    return PnPDevicePropertyType('Sint16');
                },
                PnPDevicePropertySint32: function() {
                    return PnPDevicePropertyType('Sint32');
                },
                PnPDevicePropertySint64: function() {
                    return PnPDevicePropertyType('Sint64');
                },
                PnPDevicePropertyString: function() {
                    return PnPDevicePropertyType('String');
                },
                PnPDevicePropertyBoolean: function() {
                    return PnPDevicePropertyType('Boolean');
                },
                PnPDevicePropertyReal32: function() {
                    return PnPDevicePropertyType('Real32');
                },
                PnPDevicePropertyReal64: function() {
                    return PnPDevicePropertyType('Real64');
                },
                PnPDevicePropertyDateTime: function() {
                    return PnPDevicePropertyType('DateTime');
                },
                PnPDevicePropertySecurityDescriptor: function() {
                    return PnPDevicePropertyType('SecurityDescriptor');
                },
                PnPDevicePropertyBinary: function() {
                    return PnPDevicePropertyType('Binary');
                },
                PnPDevicePropertyUint16Array: function() {
                    return PnPDevicePropertyType('Uint16Array');
                },
                PnPDevicePropertyUint32Array: function() {
                    return PnPDevicePropertyType('Uint32Array');
                },
                PnPDevicePropertyUint64Array: function() {
                    return PnPDevicePropertyType('Uint64Array');
                },
                PnPDevicePropertySint8Array: function() {
                    return PnPDevicePropertyType('Sint8Array');
                },
                PnPDevicePropertySint16Array: function() {
                    return PnPDevicePropertyType('Sint16Array');
                },
                PnPDevicePropertySint32Array: function() {
                    return PnPDevicePropertyType('Sint32Array');
                },
                PnPDevicePropertySint64Array: function() {
                    return PnPDevicePropertyType('Sint64Array');
                },
                PnPDevicePropertyStringArray: function() {
                    return PnPDevicePropertyType('StringArray');
                },
                PnPDevicePropertyBooleanArray: function() {
                    return PnPDevicePropertyType('BooleanArray');
                },
                PnPDevicePropertyReal32Array: function() {
                    return PnPDevicePropertyType('Real32Array');
                },
                PnPDevicePropertyReal64Array: function() {
                    return PnPDevicePropertyType('Real64Array');
                },
                PnPDevicePropertyDateTimeArray: function() {
                    return PnPDevicePropertyType('DateTimeArray');
                },
                PnPDevicePropertySecurityDescriptorArray: function() {
                    return PnPDevicePropertyType('SecurityDescriptorArray');
                },
                PnPEntity: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PnPEntity", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            classGuid: o.ClassGuid,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            service: o.Service,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PointingDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PointingDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            deviceInterface: o.DeviceInterface,
                            doubleSpeedThreshold: o.DoubleSpeedThreshold,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            handedness: o.Handedness,
                            hardwareType: o.HardwareType,
                            infFileName: o.InfFileName,
                            infSection: o.InfSection,
                            installDate: o.InstallDate,
                            isLocked: o.IsLocked,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            name: o.Name,
                            numberOfButtons: o.NumberOfButtons,
                            pnpDeviceID: o.PNPDeviceID,
                            pointingType: o.PointingType,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            quadSpeedThreshold: o.QuadSpeedThreshold,
                            resolution: o.Resolution,
                            sampleRate: o.SampleRate,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            synch: o.Synch,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PortableBattery: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PortableBattery", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            batteryRechargeTime: o.BatteryRechargeTime,
                            batteryStatus: o.BatteryStatus,
                            capacityMultiplier: o.CapacityMultiplier,
                            caption: o.Caption,
                            chemistry: o.Chemistry,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            designCapacity: o.DesignCapacity,
                            designVoltage: o.DesignVoltage,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            estimatedChargeRemaining: o.EstimatedChargeRemaining,
                            estimatedRunTime: o.EstimatedRunTime,
                            expectedBatteryLife: o.ExpectedBatteryLife,
                            expectedLife: o.ExpectedLife,
                            fullChargeCapacity: o.FullChargeCapacity,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            location: o.Location,
                            manufactureDate: o.ManufactureDate,
                            manufacturer: o.Manufacturer,
                            maxBatteryError: o.MaxBatteryError,
                            maxRechargeTime: o.MaxRechargeTime,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            smartBatteryVersion: o.SmartBatteryVersion,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOnBattery: o.TimeOnBattery,
                            timeToFullCharge: o.TimeToFullCharge
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PortConnector: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PortConnector", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            connectorPinout: o.ConnectorPinout,
                            connectorType: o.ConnectorType,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            externalReferenceDesignator: o.ExternalReferenceDesignator,
                            installDate: o.InstallDate,
                            internalReferenceDesignator: o.InternalReferenceDesignator,
                            manufacturer: o.Manufacturer,
                            model: o.Model,
                            name: o.Name,
                            otherIdentifyingInfo: o.OtherIdentifyingInfo,
                            partNumber: o.PartNumber,
                            portType: o.PortType,
                            poweredOn: o.PoweredOn,
                            serialNumber: o.SerialNumber,
                            sku: o.SKU,
                            status: o.Status,
                            tag: o.Tag,
                            version: o.Version
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PortResource: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PortResource", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            alias: o.Alias,
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            csCreationClassName: o.CSCreationClassName,
                            csName: o.CSName,
                            description: o.Description,
                            endingAddress: o.EndingAddress,
                            installDate: o.InstallDate,
                            name: o.Name,
                            startingAddress: o.StartingAddress,
                            status: o.Status
                        });
                        e.moveNext();
                    }
                    return array;
                },
                POTSModem: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_POTSModem", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            answerMode: o.AnswerMode,
                            attachedTo: o.AttachedTo,
                            availability: o.Availability,
                            blindOff: o.BlindOff,
                            blindOn: o.BlindOn,
                            caption: o.Caption,
                            compatibilityFlags: o.CompatibilityFlags,
                            compressionInfo: o.CompressionInfo,
                            compressionOff: o.CompressionOff,
                            compressionOn: o.CompressionOn,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            configurationDialog: o.ConfigurationDialog,
                            countriesSupported: o.CountriesSupported,
                            countrySelected: o.CountrySelected,
                            creationClassName: o.CreationClassName,
                            currentPasswords: o.CurrentPasswords,
                            dcb: o.DCB,
                            "default": o.Default,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            deviceLoader: o.DeviceLoader,
                            deviceType: o.DeviceType,
                            dialType: o.DialType,
                            driverDate: o.DriverDate,
                            errorCleared: o.ErrorCleared,
                            errorControlForced: o.ErrorControlForced,
                            errorControlInfo: o.ErrorControlInfo,
                            errorControlOff: o.ErrorControlOff,
                            errorControlOn: o.ErrorControlOn,
                            errorDescription: o.ErrorDescription,
                            flowControlHard: o.FlowControlHard,
                            flowControlOff: o.FlowControlOff,
                            flowControlSoft: o.FlowControlSoft,
                            inactivityScale: o.InactivityScale,
                            inactivityTimeout: o.InactivityTimeout,
                            index: o.Index,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maxBaudRateToPhone: o.MaxBaudRateToPhone,
                            maxBaudRateToSerialPort: o.MaxBaudRateToSerialPort,
                            maxNumberOfPasswords: o.MaxNumberOfPasswords,
                            model: o.Model,
                            modemInfPath: o.ModemInfPath,
                            modemInfSection: o.ModemInfSection,
                            modulationBell: o.ModulationBell,
                            modulationCCITT: o.ModulationCCITT,
                            modulationScheme: o.ModulationScheme,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            portSubClass: o.PortSubClass,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            prefix: o.Prefix,
                            properties: o.Properties,
                            providerName: o.ProviderName,
                            pulse: o.Pulse,
                            reset: o.Reset,
                            responsesKeyName: o.ResponsesKeyName,
                            ringsBeforeAnswer: o.RingsBeforeAnswer,
                            speakerModeDial: o.SpeakerModeDial,
                            speakerModeOff: o.SpeakerModeOff,
                            speakerModeOn: o.SpeakerModeOn,
                            speakerModeSetup: o.SpeakerModeSetup,
                            speakerVolumeHigh: o.SpeakerVolumeHigh,
                            speakerVolumeInfo: o.SpeakerVolumeInfo,
                            speakerVolumeLow: o.SpeakerVolumeLow,
                            speakerVolumeMed: o.SpeakerVolumeMed,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            stringFormat: o.StringFormat,
                            supportsCallback: o.SupportsCallback,
                            supportsSynchronousConnect: o.SupportsSynchronousConnect,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            terminator: o.Terminator,
                            timeOfLastReset: o.TimeOfLastReset,
                            tone: o.Tone,
                            voiceSwitchFeature: o.VoiceSwitchFeature
                        });
                        e.moveNext();
                    }
                    return array;
                },
                POTSModemToSerialPort: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_POTSModemToSerialPort", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessState: o.AccessState,
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Printer: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Printer", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            attributes: o.Attributes,
                            availability: o.Availability,
                            averagePagesPerMinute: o.AveragePagesPerMinute,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            defaultPriority: o.DefaultPriority,
                            description: o.Description,
                            detectedErrorState: o.DetectedErrorState,
                            deviceID: o.DeviceID,
                            driverName: o.DriverName,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            horizontalResolution: o.HorizontalResolution,
                            installDate: o.InstallDate,
                            jobCountSinceLastReset: o.JobCountSinceLastReset,
                            languagesSupported: o.LanguagesSupported,
                            lastErrorCode: o.LastErrorCode,
                            location: o.Location,
                            name: o.Name,
                            paperSizesSupported: o.PaperSizesSupported,
                            pnpDeviceID: o.PNPDeviceID,
                            portName: o.PortName,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            printerPaperNames: o.PrinterPaperNames,
                            printerState: o.PrinterState,
                            printerStatus: o.PrinterStatus,
                            printJobDataType: o.PrintJobDataType,
                            printProcessor: o.PrintProcessor,
                            separatorFile: o.SeparatorFile,
                            serverName: o.ServerName,
                            shareName: o.ShareName,
                            spoolEnabled: o.SpoolEnabled,
                            startTime: o.StartTime,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset,
                            untilTime: o.UntilTime,
                            verticalResolution: o.VerticalResolution
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterConfiguration: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterConfiguration", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            bitsPerPel: o.BitsPerPel,
                            caption: o.Caption,
                            collate: o.Collate,
                            color: o.Color,
                            copies: o.Copies,
                            description: o.Description,
                            deviceName: o.DeviceName,
                            displayFlags: o.DisplayFlags,
                            displayFrequency: o.DisplayFrequency,
                            ditherType: o.DitherType,
                            driverVersion: o.DriverVersion,
                            duplex: o.Duplex,
                            formName: o.FormName,
                            horizontalResolution: o.HorizontalResolution,
                            icmIntent: o.ICMIntent,
                            icmMethod: o.ICMMethod,
                            logPixels: o.LogPixels,
                            mediaType: o.MediaType,
                            name: o.Name,
                            orientation: o.Orientation,
                            paperLength: o.PaperLength,
                            paperSize: o.PaperSize,
                            paperWidth: o.PaperWidth,
                            pelsHeight: o.PelsHeight,
                            pelsWidth: o.PelsWidth,
                            printQuality: o.PrintQuality,
                            scale: o.Scale,
                            settingID: o.SettingID,
                            specificationVersion: o.SpecificationVersion,
                            tTOption: o.TTOption,
                            verticalResolution: o.VerticalResolution,
                            xResolution: o.XResolution,
                            yResolution: o.YResolution
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessState: o.AccessState,
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterDriver: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterDriver", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            configFile: o.ConfigFile,
                            creationClassName: o.CreationClassName,
                            dataFile: o.DataFile,
                            defaultDataType: o.DefaultDataType,
                            dependentFiles: o.DependentFiles,
                            description: o.Description,
                            driverPath: o.DriverPath,
                            filePath: o.FilePath,
                            helpFile: o.HelpFile,
                            infName: o.InfName,
                            installDate: o.InstallDate,
                            monitorName: o.MonitorName,
                            name: o.Name,
                            oemUrl: o.OEMUrl,
                            started: o.Started,
                            startMode: o.StartMode,
                            status: o.Status,
                            supportedPlatform: o.SupportedPlatform,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            version: o.Version
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterDriverDll: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterDriverDll", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterSetting: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterSetting", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            element: o.Element,
                            setting: o.Setting
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrinterShare: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrinterShare", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            antecedent: o.Antecedent,
                            dependent: o.Dependent
                        });
                        e.moveNext();
                    }
                    return array;
                },
                PrintJob: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_PrintJob", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            caption: o.Caption,
                            dataType: o.DataType,
                            description: o.Description,
                            document: o.Document,
                            driverName: o.DriverName,
                            elapsedTime: o.ElapsedTime,
                            hostPrintQueue: o.HostPrintQueue,
                            installDate: o.InstallDate,
                            jobId: o.JobId,
                            jobStatus: o.JobStatus,
                            name: o.Name,
                            notify: o.Notify,
                            owner: o.Owner,
                            pagesPrinted: o.PagesPrinted,
                            parameters: o.Parameters,
                            printProcessor: o.PrintProcessor,
                            priority: o.Priority,
                            size: o.Size,
                            startTime: o.StartTime,
                            status: o.Status,
                            statusMask: o.StatusMask,
                            timeSubmitted: o.TimeSubmitted,
                            totalPages: o.TotalPages,
                            untilTime: o.UntilTime
                        });
                        e.moveNext();
                    }
                    return array;
                },
                Processor: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_Processor", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            addressWidth: o.AddressWidth,
                            architecture: o.Architecture,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            cpuStatus: o.CpuStatus,
                            creationClassName: o.CreationClassName,
                            currentClockSpeed: o.CurrentClockSpeed,
                            currentVoltage: o.CurrentVoltage,
                            dataWidth: o.DataWidth,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            extClock: o.ExtClock,
                            family: o.Family,
                            installDate: o.InstallDate,
                            l2CacheSize: o.L2CacheSize,
                            l2CacheSpeed: o.L2CacheSpeed,
                            lastErrorCode: o.LastErrorCode,
                            level: o.Level,
                            loadPercentage: o.LoadPercentage,
                            manufacturer: o.Manufacturer,
                            maxClockSpeed: o.MaxClockSpeed,
                            name: o.Name,
                            otherFamilyDescription: o.OtherFamilyDescription,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            processorId: o.ProcessorId,
                            processorType: o.ProcessorType,
                            revision: o.Revision,
                            role: o.Role,
                            socketDesignation: o.SocketDesignation,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            stepping: o.Stepping,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            uniqueId: o.UniqueId,
                            upgradeMethod: o.UpgradeMethod,
                            version: o.Version,
                            voltageCaps: o.VoltageCaps
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SCSIController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SCSIController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            controllerTimeouts: o.ControllerTimeouts,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            deviceMap: o.DeviceMap,
                            driverName: o.DriverName,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            hardwareVersion: o.HardwareVersion,
                            index: o.Index,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxDataWidth: o.MaxDataWidth,
                            maxNumberControlled: o.MaxNumberControlled,
                            maxTransferRate: o.MaxTransferRate,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protectionManagement: o.ProtectionManagement,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SCSIControllerDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SCSIControllerDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessState: o.AccessState,
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SerialPort: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SerialPort", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            binary: o.Binary,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            maxBaudRate: o.MaxBaudRate,
                            maximumInputBufferSize: o.MaximumInputBufferSize,
                            maximumOutputBufferSize: o.MaximumOutputBufferSize,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            osAutoDiscovered: o.OSAutoDiscovered,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            providerType: o.ProviderType,
                            settableBaudRate: o.SettableBaudRate,
                            settableDataBits: o.SettableDataBits,
                            settableFlowControl: o.SettableFlowControl,
                            settableParity: o.SettableParity,
                            settableParityCheck: o.SettableParityCheck,
                            settableRLSD: o.SettableRLSD,
                            settableStopBits: o.SettableStopBits,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            supports16BitMode: o.Supports16BitMode,
                            supportsDTRDSR: o.SupportsDTRDSR,
                            supportsElapsedTimeouts: o.SupportsElapsedTimeouts,
                            supportsIntTimeouts: o.SupportsIntTimeouts,
                            supportsParityCheck: o.SupportsParityCheck,
                            supportsRLSD: o.SupportsRLSD,
                            supportsRTSCTS: o.SupportsRTSCTS,
                            supportsSpecialCharacters: o.SupportsSpecialCharacters,
                            supportsXOnXOff: o.SupportsXOnXOff,
                            supportsXOnXOffSet: o.SupportsXOnXOffSet,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SerialPortConfiguration: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SerialPortConfiguration", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            abortReadWriteOnError: o.AbortReadWriteOnError,
                            baudRate: o.BaudRate,
                            binaryModeEnabled: o.BinaryModeEnabled,
                            bitsPerByte: o.BitsPerByte,
                            caption: o.Caption,
                            continueXMitOnXOff: o.ContinueXMitOnXOff,
                            ctsOutflowControl: o.CTSOutflowControl,
                            description: o.Description,
                            discardNULLBytes: o.DiscardNULLBytes,
                            dsrOutflowControl: o.DSROutflowControl,
                            dsrSensitivity: o.DSRSensitivity,
                            dtrFlowControlType: o.DTRFlowControlType,
                            eofCharacter: o.EOFCharacter,
                            errorReplaceCharacter: o.ErrorReplaceCharacter,
                            errorReplacementEnabled: o.ErrorReplacementEnabled,
                            eventCharacter: o.EventCharacter,
                            isBusy: o.IsBusy,
                            name: o.Name,
                            parity: o.Parity,
                            parityCheckEnabled: o.ParityCheckEnabled,
                            rtsFlowControlType: o.RTSFlowControlType,
                            settingID: o.SettingID,
                            stopBits: o.StopBits,
                            xOffCharacter: o.XOffCharacter,
                            xOffXMitThreshold: o.XOffXMitThreshold,
                            xOnCharacter: o.XOnCharacter,
                            xOnXMitThreshold: o.XOnXMitThreshold,
                            xOnXOffInFlowControl: o.XOnXOffInFlowControl,
                            xOnXOffOutFlowControl: o.XOnXOffOutFlowControl
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SerialPortSetting: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SerialPortSetting", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            element: o.Element,
                            setting: o.Setting
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SMBIOSMemory: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SMBIOSMemory", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            access: o.Access,
                            additionalErrorData: o.AdditionalErrorData,
                            availability: o.Availability,
                            blockSize: o.BlockSize,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            correctableError: o.CorrectableError,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            endingAddress: o.EndingAddress,
                            errorAccess: o.ErrorAccess,
                            errorAddress: o.ErrorAddress,
                            errorCleared: o.ErrorCleared,
                            errorData: o.ErrorData,
                            errorDataOrder: o.ErrorDataOrder,
                            errorDescription: o.ErrorDescription,
                            errorInfo: o.ErrorInfo,
                            errorMethodology: o.ErrorMethodology,
                            errorResolution: o.ErrorResolution,
                            errorTime: o.ErrorTime,
                            errorTransferSize: o.ErrorTransferSize,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            name: o.Name,
                            numberOfBlocks: o.NumberOfBlocks,
                            otherErrorDescription: o.OtherErrorDescription,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            purpose: o.Purpose,
                            startingAddress: o.StartingAddress,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemLevelAddress: o.SystemLevelAddress,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                SoundDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_SoundDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            dmaBufferSize: o.DMABufferSize,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            mpu401Address: o.MPU401Address,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            productName: o.ProductName,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                TapeDrive: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_TapeDrive", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            capabilities: o.Capabilities,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            compression: o.Compression,
                            compressionMethod: o.CompressionMethod,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            defaultBlockSize: o.DefaultBlockSize,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            ecc: o.ECC,
                            eotWarningZoneSize: o.EOTWarningZoneSize,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            errorMethodology: o.ErrorMethodology,
                            featuresHigh: o.FeaturesHigh,
                            featuresLow: o.FeaturesLow,
                            id: o.Id,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxBlockSize: o.MaxBlockSize,
                            maxMediaSize: o.MaxMediaSize,
                            maxPartitionCount: o.MaxPartitionCount,
                            mediaType: o.MediaType,
                            minBlockSize: o.MinBlockSize,
                            name: o.Name,
                            needsCleaning: o.NeedsCleaning,
                            numberOfMediaSupported: o.NumberOfMediaSupported,
                            padding: o.Padding,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            reportSetMarks: o.ReportSetMarks,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName
                        });
                        e.moveNext();
                    }
                    return array;
                },
                TCPIPPrinterPort: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_TCPIPPrinterPort", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            byteCount: o.ByteCount,
                            caption: o.Caption,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            hostAddress: o.HostAddress,
                            installDate: o.InstallDate,
                            name: o.Name,
                            portNumber: o.PortNumber,
                            protocol: o.Protocol,
                            queue: o.Queue,
                            snmpCommunity: o.SNMPCommunity,
                            snmpDevIndex: o.SNMPDevIndex,
                            snmpEnabled: o.SNMPEnabled,
                            status: o.Status,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            type: o.Type
                        });
                        e.moveNext();
                    }
                    return array;
                },
                USBController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_USBController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            lastErrorCode: o.LastErrorCode,
                            manufacturer: o.Manufacturer,
                            maxNumberControlled: o.MaxNumberControlled,
                            name: o.Name,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            timeOfLastReset: o.TimeOfLastReset
                        });
                        e.moveNext();
                    }
                    return array;
                },
                USBControllerDevice: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_USBControllerDevice", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accessState: o.AccessState,
                            antecedent: o.Antecedent,
                            dependent: o.Dependent,
                            negotiatedDataWidth: o.NegotiatedDataWidth,
                            negotiatedSpeed: o.NegotiatedSpeed,
                            numberOfHardResets: o.NumberOfHardResets,
                            numberOfSoftResets: o.NumberOfSoftResets
                        });
                        e.moveNext();
                    }
                    return array;
                },
                VideoController: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_VideoController", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            acceleratorCapabilities: o.AcceleratorCapabilities,
                            adapterCompatibility: o.AdapterCompatibility,
                            adapterDACType: o.AdapterDACType,
                            adapterRAM: o.AdapterRAM,
                            availability: o.Availability,
                            capabilityDescriptions: o.CapabilityDescriptions,
                            caption: o.Caption,
                            colorTableEntries: o.ColorTableEntries,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            currentBitsPerPixel: o.CurrentBitsPerPixel,
                            currentHorizontalResolution: o.CurrentHorizontalResolution,
                            currentNumberOfColors: o.CurrentNumberOfColors,
                            currentNumberOfColumns: o.CurrentNumberOfColumns,
                            currentNumberOfRows: o.CurrentNumberOfRows,
                            currentRefreshRate: o.CurrentRefreshRate,
                            currentScanMode: o.CurrentScanMode,
                            currentVerticalResolution: o.CurrentVerticalResolution,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            deviceSpecificPens: o.DeviceSpecificPens,
                            ditherType: o.DitherType,
                            driverDate: o.DriverDate,
                            driverVersion: o.DriverVersion,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            icmIntent: o.ICMIntent,
                            icmMethod: o.ICMMethod,
                            infFilename: o.InfFilename,
                            infSection: o.InfSection,
                            installDate: o.InstallDate,
                            installedDisplayDrivers: o.InstalledDisplayDrivers,
                            lastErrorCode: o.LastErrorCode,
                            maxMemorySupported: o.MaxMemorySupported,
                            maxNumberControlled: o.MaxNumberControlled,
                            maxRefreshRate: o.MaxRefreshRate,
                            minRefreshRate: o.MinRefreshRate,
                            monochrome: o.Monochrome,
                            name: o.Name,
                            numberOfColorPlanes: o.NumberOfColorPlanes,
                            numberOfVideoPages: o.NumberOfVideoPages,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            protocolSupported: o.ProtocolSupported,
                            reservedSystemPaletteEntries: o.ReservedSystemPaletteEntries,
                            specificationVersion: o.SpecificationVersion,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            systemPaletteEntries: o.SystemPaletteEntries,
                            timeOfLastReset: o.TimeOfLastReset,
                            videoArchitecture: o.VideoArchitecture,
                            videoMemoryType: o.VideoMemoryType,
                            videoMode: o.VideoMode,
                            videoModeDescription: o.VideoModeDescription,
                            videoProcessor: o.VideoProcessor
                        });
                        e.moveNext();
                    }
                    return array;
                },
                VideoSettings: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_VideoSettings", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            element: o.Element,
                            setting: o.Setting
                        });
                        e.moveNext();
                    }
                    return array;
                },
                VoltageProbe: function() {
                    var array = [];
                    var e = new Enumerator(service.ExecQuery("Select * from Win32_VoltageProbe", null, 48));
                    e.moveFirst();
                    while (!e.atEnd()) {
                        var o = e.item();
                        array.push({
                            accuracy: o.Accuracy,
                            availability: o.Availability,
                            caption: o.Caption,
                            configManagerErrorCode: o.ConfigManagerErrorCode,
                            configManagerUserConfig: o.ConfigManagerUserConfig,
                            creationClassName: o.CreationClassName,
                            currentReading: o.CurrentReading,
                            description: o.Description,
                            deviceID: o.DeviceID,
                            errorCleared: o.ErrorCleared,
                            errorDescription: o.ErrorDescription,
                            installDate: o.InstallDate,
                            isLinear: o.IsLinear,
                            lastErrorCode: o.LastErrorCode,
                            lowerThresholdCritical: o.LowerThresholdCritical,
                            lowerThresholdFatal: o.LowerThresholdFatal,
                            lowerThresholdNonCritical: o.LowerThresholdNonCritical,
                            maxReadable: o.MaxReadable,
                            minReadable: o.MinReadable,
                            name: o.Name,
                            nominalReading: o.NominalReading,
                            normalMax: o.NormalMax,
                            normalMin: o.NormalMin,
                            pnpDeviceID: o.PNPDeviceID,
                            powerManagementCapabilities: o.PowerManagementCapabilities,
                            powerManagementSupported: o.PowerManagementSupported,
                            resolution: o.Resolution,
                            status: o.Status,
                            statusInfo: o.StatusInfo,
                            systemCreationClassName: o.SystemCreationClassName,
                            systemName: o.SystemName,
                            tolerance: o.Tolerance,
                            upperThresholdCritical: o.UpperThresholdCritical,
                            upperThresholdFatal: o.UpperThresholdFatal,
                            upperThresholdNonCritical: o.UpperThresholdNonCritical
                        });
                        e.moveNext();
                    }
                    return array;
                }
            };
            if (what == 'All') {
                for (var who in choose) {
                    this[who] = choose[who]();
                }
            } else if (!choose[what])
                throw new Error("Unknown element: " + what);
            else
                this[what] = choose[what]();
        }
    };
})();