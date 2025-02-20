import React, {  useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import RowMsaFormSupervisor from "../../../../components/RowMsaFormSupervisor";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import checkUpdateicon from "../../../../public/check-save-and-finish.svg"
import IssuesFoundModal from "../../../../components/IssuesFoundModal";
import BackButton from '../../../../components/BackButton'
import BackToDashboardButton from '../../../../components/BackToDashboardButton'

const EditSupervisorMSAFormPage = ({ data }) => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [clientData, setClientData] = useState({
    dateFormReviewed: new Date(),
    clientId: data[0].clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,

    AIRSIntakeForm:
      data[0].AIRSIntakeForm === "0" || data[0].AIRSIntakeForm === null
        ? false
        : true,
    AIRSIntakeFormDate: data[0].airsintakeformdate,
    AIRSIntakeFormPDF:
      data[0].airsintakeformpdf === "0" || data[0].airsintakeformpdf === null
        ? false
        : true,
    AIRSIntakeFormScan:
      data[0].airsintakeformscan === "0" || data[0].airsintakeformscan === null
        ? false
        : true,
    AIRSIntakeFormReviewed:data[0]?.airsintakeformreviewed==="1" ? true : false,
    AIRSIntakeFormIssues:"",
    AIRSIntakeFormUploadDate:data[0].airsintakeformuploaddate==="" ||data[0].airsintakeformuploaddate===null
    ?data[0].airsintakeformdate:data[0].airsintakeformuploaddate,

    ComprehensiveRiskBehaviorAssessment:
      data[0].comprehensiveriskbehaviorassessment === "0" ||
      data[0].comprehensiveriskbehaviorassessment === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentPDF:
      data[0].comprehensiveriskbehaviorassessmentpdf === "0" ||
      data[0].comprehensiveriskbehaviorassessmentpdf === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentScan:
      data[0].comprehensiveriskbehaviorassessmentscan === "0" ||
      data[0].comprehensiveriskbehaviorassessmentscan === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentIssues:"",
    ComprehensiveRiskBehaviorAssessmentReviewed:data[0]?.comprehensiveriskbehaviorassessmentreviewed==="1" ? true : false,
    ComprehensiveRiskBehaviorAssessmentUploadDate:data[0].comprehensiveriskbehaviorassessmentdate || null,

    ServiceActionPlan:
      data[0].serviceactionplan === "0" || data[0].serviceactionplan === null
        ? false
        : true,
    ServiceActionPlanDate: data[0].sapplanstartdate,
    // ServiceActionPlanPDF: data[0].serviceactionplanpdf === "0" ? true : false,
    ServiceActionPlanScan:
      data[0].serviceactionplanscan === "0" ||
      data[0].serviceactionplanscan === null
        ? false
        : true,
    ServiceActionPlanUploadDate: data[0].serviceactionplanuploaddate === "" || data[0].serviceactionplanuploaddate === null ?data[0].serviceactionplandate:
    data[0].serviceactionplanuploaddate,
    ServiceActionPlanReviewed:data[0]?.serviceactionplanreviewed==="1" ? true : false,
    ServiceActionPlanIssues:"",

    ProgressNote:
      data[0].progressnoteid === "" || data[0].progressnoteid === null
        ? false
        : true,
    ProgressNoteDate: data[0].progressnotedate,
    ProgressNoteUploadDate: data[0].progressnoteuploaddate=== "" ||data[0].progressnoteuploaddate=== null ? data[0].progressnotedate:
    data[0].progressnoteuploaddate,
    ProgressNoteScan:
      data[0].progressnotescan || data[0].progressnotescan === null
        ? false
        : true,
    ProgressNotePDF:
      data[0].progressnotepdf || data[0].progressnotepdf === null
        ? false
        : true,
    ProgressNoteReviewed:data[0]?.progressnotereviewed==="1" ? true : false,
    ProgressNoteIssues:"",

    StatusChangesForm:
      data[0].statuschangesform === "0" || data[0].statuschangesform === null
        ? false
        : true,
    StatusChangesFormDate: data[0].statuschangesformdate,
    StatusChangesFormUploadDate: data[0].statuschangesformuploaddate==="" || data[0].statuschangesformuploaddate===null ? data[0].statuschangesformdate:
    data[0].statuschangesformdate,
    StatusChangesFormScan:
      data[0].statuschangesformscan === "0" ||
      data[0].statuschangesformscan === null
        ? false
        : true,
    StatusChangesFormPDF:
      data[0].statuschangesformpdf === "0" ||
      data[0].statuschangesformpdf === null
        ? false
        : true,
    StatusChangesFormReviewed:data[0]?.statuschangesformreviewed==="1" ? true : false,
    StatusChangesFormIssues:"",
     
    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0].comprehensiveriskbehaviorassessmentupdates === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdates === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate === "" || data[0].comprehensiveriskbehaviorassessmentuploaddate === null?data[0].comprehensiveriskbehaviorassessmentdate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate,
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan:
      data[0].comprehensiveriskbehaviorassessmentupdatesformscan === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdatesformscan === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF:
      data[0].comprehensiveriskbehaviorassessmentpdf === "0" ||
      data[0].comprehensiveriskbehaviorassessmentpdf === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesReviewed:data[0]?.comprehensiveriskbehaviorassessmentupdatesreviewed==="1" ? true : false,
    ComprehensiveRiskBehaviorAssessmentUpdatesIssues:"",

    M11QForm:
      data[0].m11qform === "0" || data[0].m11qform === null ? false : true,
    M11QFormDate: data[0].m11qformdate,
    M11QFormUploadDate: data[0].m11qformuploaddate==="" || data[0].m11qformuploaddate===null?data[0].m11qformdate:data[0].m11qformuploaddate,
    M11QFormScan:
      data[0].m11qformscan === "0" || data[0].m11qformscan === null
        ? false
        : true,
    M11QFormPDF:
      data[0].m11qformpdf === "0" || data[0].m11qformpdf === null
        ? false
        : true,
    M11QFormReviewed:data[0]?.m11qformreviewed==="1" ? true : false,
    M11QFormIssues:"",

    CD4VLReports:
      data[0].cd4vlreports === "0" || data[0].cd4vlreports === null
        ? false
        : true,
    CD4VLReportsDate: data[0].cd4vlreportsdate,
    CD4VLReportsUploadDate: data[0].cd4vlreportsuploaddate==="" || data[0].cd4vlreportsuploaddate===null ?data[0].cd4vlreportsdate:data[0].cd4vlreportsuploaddate,
    CD4VLReportsScan:
      data[0].cd4vlreportsscan === "0" || data[0].cd4vlreportsscan === null
        ? false
        : true,
    CD4VLReportsPDF:
      data[0].cd4vlreportspdf === "0" || data[0].cd4vlreportspdf === null
        ? false
        : true,
    CD4VLReportsReviewed:data[0]?.cd4vlreportsreviewed==="1" ? true : false,
    CD4VLReportsIssues:"",

    InitialTreatmentAdherenceIntake:
      data[0].initialtreatmentadherenceintake === "0" ||
      data[0].initialtreatmentadherenceintake === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeDate:
      data[0].initialtreatmentadherenceintakedate,
    InitialTreatmentAdherenceIntakeUploadDate:
      data[0].initialtreatmentadherenceintakeuploaddate==="" || data[0].initialtreatmentadherenceintakeuploaddate===null?data[0].initialtreatmentadherenceintakedate:data[0].initialtreatmentadherenceintakeuploaddate,
    InitialTreatmentAdherenceIntakeScan:
      data[0].initialtreatmentadherenceintakescan === "0" ||
      data[0].initialtreatmentadherenceintakescan === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakePDF:
      data[0].initialtreatmentadherenceintakepdf === "0" ||
      data[0].initialtreatmentadherenceintakepdf === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeReviewed:data[0]?.initialtreatmentadherenceintakereviewed==="1" ? true : false,
    InitialTreatmentAdherenceIntakeIssues:"",

    TreatmentAdherenceUpdates:
      data[0].treatmentadherenceupdates === "0" ||
      data[0].treatmentadherenceupdates === null
        ? false
        : true,
    TreatmentAdherenceUpdatesDate: data[0].treatmentadherenceupdatesdate,
    TreatmentAdherenceUpdatesUploadDate:
      data[0].treatmentadherenceupdatesuploaddate==="" || data[0].treatmentadherenceupdatesuploaddate===null ? data[0].treatmentadherenceupdatesdate:data[0].treatmentadherenceupdatesuploaddate,
    TreatmentAdherenceUpdatesScan:
      data[0].treatmentadherenceupdatesscan === "0" ||
      data[0].treatmentadherenceupdatesscan === null
        ? false
        : true,
    TreatmentAdherenceUpdatesPDF:
      data[0].treatmentadherenceupdatespdf === "0" ||
      data[0].treatmentadherenceupdatespdf === null
        ? false
        : true,
    TreatmentAdherenceUpdatesReviewed:data[0]?.treatmentadherenceupdatesreviewed==="1" ? true : false,
    TreatmentAdherenceUpdatesIssues:"",

    AIRSCollateralInformation:
      data[0].airscollateralinformation === "0" ||
      data[0].airscollateralinformation === null
        ? false
        : true,
    AIRSCollateralInformationDate: data[0].airscollateralinformationdate,
    AIRSCollateralInformationPDF:
      data[0].airscollateralinformationpdf === "0" ||
      data[0].airscollateralinformationpdf === null
        ? false
        : true,
    AIRSCollateralInformationScan:
      data[0].airscollateralinformationscan === "0" ||
      data[0].airscollateralinformationscan === null
        ? false
        : true,
    AIRSCollateralInformationUploadDate:
      data[0].airscollateralinformationuploaddate==="" || data[0].airscollateralinformationuploaddate===null?data[0].airscollateralinformationdate:data[0].airscollateralinformationuploaddate,
    AIRSCollateralInformationReviewed:data[0]?.airscollateralinformationreviewed==="1" ? true : false,
    AIRSCollateralInformationIssues:"",

    AIRSDrugRegimen:
      data[0].airsdrugregimen === "0" || data[0].airsdrugregimen === null
        ? false
        : true,
    AIRSDrugRegimenDate: data[0].airsdrugregimendate,
    AIRSDrugRegimenPDF:
      data[0].airsdrugregimenpdf === "0" || data[0].airsdrugregimenpdf === null
        ? false
        : true,
    AIRSDrugRegimenScan:
      data[0].airsdrugregimenscan === "0" ||
      data[0].airsdrugregimenscan === null
        ? false
        : true,
    AIRSDrugRegimenUploadDate: data[0].airsdrugregimenuploaddate==="" || data[0].airsdrugregimenuploaddate===null ? data[0].airsdrugregimendate:data[0].airsdrugregimenuploaddate,
    AIRSDrugRegimenReviewed:data[0]?.airsdrugregimenreviewed==="1" ? true : false,
    AIRSDrugRegimenIssues:"",

    AIRSFinancialInformation:
      data[0].airsfinancialinformation === "0" ||
      data[0].airsfinancialinformation === null
        ? false
        : true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSFinancialInformationPDF:
      data[0].airsfinancialinformationpdf === "0" ||
      data[0].airsfinancialinformationpdf === null
        ? false
        : true,
    AIRSFinancialInformationScan:
      data[0].airsfinancialinformationscan === "0" ||
      data[0].airsfinancialinformationscan === null
        ? false
        : true,
    AIRSFinancialInformationUploadDate:
      data[0].airsfinancialinformationuploaddate==="" || data[0].airsfinancialinformationuploaddate===null?data[0].airsfinancialinformationdate:data[0].airsfinancialinformationuploaddate,
    AIRSFinancialInformationReviewed:data[0]?.airsfinancialinformationreviewed==="1" ? true : false,
    AIRSFinancialInformationIssues:"",

    AIRSHIVAIDSRiskHistory:
      data[0].airshivaidsriskhistory === "0" ||
      data[0].airshivaidsriskhistory === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHIVAIDSRiskHistoryPDF:
      data[0].airshivaidsriskhistorypdf === "0" ||
      data[0].airshivaidsriskhistorypdf === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryScan:
      data[0].airshivaidsriskhistoryscan === "0" ||
      data[0].airshivaidsriskhistoryscan === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryUploadDate:
      data[0].airshivaidsriskhistoryuploaddate===""|| data[0].airshivaidsriskhistoryuploaddate===null?data[0].airshivaidsriskhistorydate:data[0].airshivaidsriskhistoryuploaddate,
    AIRSHIVAIDSRiskHistoryReviewed:data[0]?.airshivaidsriskhistoryreviewed==="1" ? true : false,
    AIRSHIVAIDSRiskHistoryIssues:"",

    AIRSHIVMedicalProvider:
      data[0].airshivmedicalprovider === "0" ||
      data[0].airshivmedicalprovider === null
        ? false
        : true,
    AIRSHIVMedicalProviderDate: data[0].airshivmedicalproviderdate,
    AIRSHIVMedicalProviderPDF:
      data[0].airshivmedicalproviderpdf === "0" ||
      data[0].airshivmedicalproviderpdf === null
        ? false
        : true,
    AIRSHIVMedicalProviderScan:
      data[0].airshivaidsriskhistoryscan === "0" ||
      data[0].airshivmedicalproviderscan === null
        ? false
        : true,
    AIRSHIVMedicalProviderUploadDate:
      data[0].airshivmedicalprovideruploaddate ==="" || data[0].airshivmedicalprovideruploaddate ===null ?data[0].airshivmedicalproviderdate:data[0].airshivmedicalprovideruploaddate,
    AIRSHIVMedicalProviderReviewed:data[0]?.airshivmedicalproviderreviewed==="1" ? true : false,
    AIRSHIVMedicalProviderIssues:"",

    AIRSHIVStatusHistory:
      data[0].airshivstatushistory === "0" ||
      data[0].airshivstatushistory === null
        ? false
        : true,
    AIRSHIVStatusHistoryDate: data[0].airshivstatushistorydate,
    AIRSHIVStatusHistoryPDF:
      data[0].airshivstatushistorypdf === "0" ||
      data[0].airshivstatushistorypdf === null
        ? false
        : true,
    AIRSHIVStatusHistoryScan:
      data[0].airshivstatushistoryscan === "0" ||
      data[0].airshivstatushistoryscan === null
        ? false
        : true,
    AIRSHIVStatusHistoryUploadDate:
      data[0].airshivstatushistoryuploaddate ==="" || data[0].airshivstatushistoryuploaddate ===null ? data[0].airshivstatushistorydate:data[0].airshivstatushistoryuploaddate,
    AIRSHIVStatusHistoryReviewed:data[0]?.airshivstatushistoryreviewed==="1" ? true : false,
    AIRSHIVStatusHistoryIssues:"",

    AIRSHCVHistory:
      data[0].airshcvhistory === "0" || data[0].airshcvhistory === null
        ? false
        : true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate,
    AIRSHCVHistoryPDF:
      data[0].airshcvhistorypdf === "0" || data[0].airshcvhistorypdf === null
        ? false
        : true,
    AIRSHCVHistoryScan:
      data[0].airshcvhistoryscan === "0" || data[0].airshcvhistoryscan === null
        ? false
        : true,
    AIRSHCVHistoryUploadDate: data[0].airshcvhistoryuploaddate ==="" || data[0].airshcvhistoryuploaddate ===null?data[0].airshcvhistorydate:data[0].airshcvhistoryuploaddate,
    AIRSHCVHistoryReviewed:data[0]?.airshcvhistoryreviewed==="1" ? true : false,
    AIRSHCVHistoryIssues:"",

    AIRSHousingInformation:
      data[0].airshousinginformation === "0" ||
      data[0].airshousinginformation === null
        ? false
        : true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate,
    AIRSHousingInformationPDF:
      data[0].airshousinginformationpdf === "0" ||
      data[0].airshousinginformationpdf === null
        ? false
        : true,
    AIRSHousingInformationScan:
      data[0].airshousinginformationscan === "0" ||
      data[0].airshousinginformationscan === null
        ? false
        : true,
    AIRSHousingInformationUploadDate:
      data[0].airshousinginformationuploaddate ==="" || data[0].airshousinginformationuploaddate ===null?data[0].airshousinginformationdate:data[0].airshousinginformationuploaddate,
    AIRSHousingInformationReviewed:data[0]?.airshousinginformationreviewed==="1" ? true : false,
    AIRSHousingInformationIssues:"",

    AIRSInsuranceInformation:
      data[0].airsinsuranceinformation === "0" ||
      data[0].airsinsuranceinformation === null
        ? false
        : true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate,
    AIRSInsuranceInformationPDF:
      data[0].airsinsuranceinformationpdf === "0" ||
      data[0].airsinsuranceinformationpdf === null
        ? false
        : true,
    AIRSInsuranceInformationScan:
      data[0].airsinsuranceinformationscan === "0" ||
      data[0].airsinsuranceinformationscan === null
        ? false
        : true,
    AIRSInsuranceInformationUploadDate:
      data[0].airsinsuranceinformationuploaddate==="" ||data[0].airsinsuranceinformationuploaddate=== null?data[0].airsinsuranceinformationdate:data[0].airsinsuranceinformationuploaddate,
    AIRSInsuranceInformationReviewed:data[0]?.airsinsuranceinformationreviewed==="1" ? true : false,
    AIRSInsuranceInformationIssues:"",

    AIRSSubstanceUseHistory:
      data[0].airssubstanceusehistory === "0" ||
      data[0].airssubstanceusehistory === null
        ? false
        : true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate,
    AIRSSubstanceUseHistoryPDF:
      data[0].airssubstanceusehistorypdf === "0" ||
      data[0].airssubstanceusehistorypdf === null
        ? false
        : true,
    AIRSSubstanceUseHistoryScan:
      data[0].airssubstanceusehistoryscan === "0" ||
      data[0].airssubstanceusehistoryscan === null
        ? false
        : true,
    AIRSSubstanceUseHistoryUploadDate:
      data[0].airssubstanceusehistoryuploaddate==="" ||data[0].airssubstanceusehistoryuploaddate=== null
      ?data[0].airssubstanceusehistorydate:data[0].airssubstanceusehistoryuploaddate,
    AIRSSubstanceUseHistoryReviewed:data[0]?.airssubstanceusehistoryreviewed==="1" ? true : false,
    AIRSSubstanceUseHistoryIssues:"",

    LNEClientRights:
      data[0].lneclientrights === "0" || data[0].lneclientrights === null
        ? false
        : true,
    LNEClientRightsDate: data[0].lneclientrightsdate,
    LNEClientRightsPDF:
      data[0].lneclientrightspdf === "0" || data[0].lneclientrightspdf === null
        ? false
        : true,
    LNEClientRightsScan:
      data[0].lneclientrightsscan === "0" ||
      data[0].lneclientrightsscan === null
        ? false
        : true,
    LNEClientRightsUploadDate: data[0].lneclientrightsuploaddate==="" || data[0].lneclientrightsuploaddate ===null
    ?data[0].lneclientrightsdate:data[0].lneclientrightsuploaddate,
    LNEClientRightsReviewed:data[0]?.lneclientrightsreviewed==="1" ? true : false,
    LNEClientRightsIssues:"",

    LNEClientGrievancePolicyProcedure:
      data[0].lneclientgrievancepolicyprocedure === "0" ||
      data[0].lneclientgrievancepolicyprocedure === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureDate:
      data[0].lneclientgrievancepolicyproceduredate,
    LNEClientGrievancePolicyProcedurePDF:
      data[0].lneclientgrievancepolicyprocedurepdf === "0" ||
      data[0].lneclientgrievancepolicyprocedurepdf === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureScan:
      data[0].lneclientgrievancepolicyprocedurescan === "0" ||
      data[0].lneclientgrievancepolicyprocedurescan === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureUploadDate:
      data[0].lneclientgrievancepolicyprocedureuploaddate==="" || data[0].lneclientgrievancepolicyprocedureuploaddate=== null
      ?data[0].lneclientgrievancepolicyproceduredate:data[0].lneclientgrievancepolicyprocedureuploaddate,
    LNEClientGrievancePolicyProcedureReviewed:data[0]?.lneclientgrievancepolicyprocedurereviewed==="1" ? true : false,
    LNEClientGrievancePolicyProcedureIssues:"",

    LNEProgramRules:
      data[0].lneprogramrules === "0" || data[0].lneprogramrules === null
        ? false
        : true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate,
    LNEProgramRulesPDF:
      data[0].lneprogramrulespdf === "0" || data[0].lneprogramrulespdf === null
        ? false
        : true,
    LNEProgramRulesScan:
      data[0].lneprogramrulesscan === "0" ||
      data[0].lneprogramrulesscan === null
        ? false
        : true,
    LNEProgramRulesUploadDate: data[0].lneprogramrulesuploaddate==="" || data[0].lneprogramrulesuploaddate===null
    ?data[0].lneprogramrulesdate:data[0].lneprogramrulesuploaddate,
    LNEProgramRulesReviewed:data[0]?.lneprogramrulesreviewed==="1" ? true : false,
    LNEProgramRulesIssues:"",

    LNEEmergencyContactConsent:
      data[0].lneemergencycontactconsent === "0" ||
      data[0].lneemergencycontactconsent === null
        ? false
        : true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate,
    LNEEmergencyContactConsentPDF:
      data[0].lneemergencycontactconsentpdf === "0" ||
      data[0].lneemergencycontactconsentpdf === null
        ? false
        : true,
    LNEEmergencyContactConsentScan:
      data[0].lneemergencycontactconsentscan === "0" ||
      data[0].lneemergencycontactconsentscan === null
        ? false
        : true,
    LNEEmergencyContactConsentUploadDate:
      data[0].lneemergencycontactconsentuploaddate==="" ||data[0].lneemergencycontactconsentuploaddate===null
      ?data[0].lneemergencycontactconsentdate:data[0].lneemergencycontactconsentuploaddate,
    LNEEmergencyContactConsentReviewed:data[0]?.lneemergencycontactconsentreviewed==="1" ? true : false,
    LNEEmergencyContactConsentIssues:"",

    LNEConsentForReleaseOfConfidentialInformation:
      data[0].lneconsentforreleaseofconfidentialinformation === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformation === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationDate:
      data[0].lneconsentforreleaseofconfidentialinformationdate,
    LNEConsentForReleaseOfConfidentialInformationPDF:
      data[0].lneconsentforreleaseofconfidentialinformationpdf === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationpdf === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationScan:
      data[0].lneconsentforreleaseofconfidentialinformationscan === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationscan === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationUploadDate:
      data[0].lneconsentforreleaseofconfidentialinformationuploaddate==="" 
      ||data[0].lneconsentforreleaseofconfidentialinformationuploaddate=== null
      ?data[0].lneconsentforreleaseofconfidentialinformationdate:data[0].lneconsentforreleaseofconfidentialinformationuploaddate,
    LNEConsentForReleaseOfConfidentialInformationReviewed:data[0]?.lneconsentforreleaseofconfidentialinformationreviewed==="1" ? true : false,
    LNEConsentForReleaseOfConfidentialInformationIssues:"",

    HIPPAConsentForm:
      data[0].hippaconsentform === "0" || data[0].hippaconsentform === null
        ? false
        : true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate,
    HIPPAConsentFormPDF:
      data[0].hippaconsentformpdf === "0" ||
      data[0].hippaconsentformpdf === null
        ? false
        : true,
    HIPPAConsentFormScan:
      data[0].hippaconsentformscan === "0" ||
      data[0].hippaconsentformscan === null
        ? false
        : true,
    HIPPAConsentFormUploadDate: data[0].hippaconsentformuploaddate ==="" || data[0].hippaconsentformuploaddate===null
    ?data[0].hippaconsentformdate:data[0].hippaconsentformuploaddate,
    HIPPAConsentFormReviewed:data[0]?.hippaconsentformreviewed==="1" ? true : false,
    HIPPAConsentFormIssues:"",

    NYCDOHMHNoticeOfPrivacyPractices:
      data[0].nycdohmhnoticeofprivacypractices === "0" ||
      data[0].nycdohmhnoticeofprivacypractices === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      data[0].nycdohmhnoticeofprivacypracticesdate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF:
      data[0].nycdohmhnoticeofprivacypracticespdf === "0" ||
      data[0].nycdohmhnoticeofprivacypracticespdf === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesScan:
      data[0].nycdohmhnoticeofprivacypracticesscan === "0" ||
      data[0].nycdohmhnoticeofprivacypracticesscan === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
      data[0].nycdohmhnoticeofprivacypracticesuploaddate==="" ||data[0].nycdohmhnoticeofprivacypracticesuploaddate=== null
      ?data[0].nycdohmhnoticeofprivacypracticesdate:data[0].nycdohmhnoticeofprivacypracticesuploaddate,
    NYCDOHMHNoticeOfPrivacyPracticesReviewed:data[0]?.nycdohmhnoticeofprivacypracticesreviewed==="1" ? true : false,
    NYCDOHMHNoticeOfPrivacyPracticesIssues:"",

    LinkageRetentionAdherenceForms:
      data[0].linkageretentionadherenceforms === "0" ||
      data[0].linkageretentionadherenceforms === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsDate:
      data[0].linkageretentionadherenceformsdate,
    LinkageRetentionAdherenceFormsPDF:
      data[0].linkageretentionadherenceformspdf === "0" ||
      data[0].linkageretentionadherenceformspdf === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsScan:
      data[0].linkageretentionadherenceformsscan === "0" ||
      data[0].linkageretentionadherenceformsscan === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsUploadDate:
      data[0].linkageretentionadherenceformsuploaddate==="" || data[0].linkageretentionadherenceformsuploaddate=== null
      ?data[0].linkageretentionadherenceformsdate:data[0].linkageretentionadherenceformsuploaddate,
    LinkageRetentionAdherenceFormsReviewed:data[0]?.linkageretentionadherenceformsreviewed==="1" ? true : false,
    LinkageRetentionAdherenceFormsIssues:"",

    InternalReferralInformation:
      data[0].internalreferralinformation === "0" ||
      data[0].internalreferralinformation === null
        ? false
        : true,
    InternalReferralInformationDate: data[0].internalreferralinformationdate,
    InternalReferralInformationPDF:
      data[0].internalreferralinformationpdf === "0" ||
      data[0].internalreferralinformationpdf === null
        ? false
        : true,
    InternalReferralInformationScan:
      data[0].internalreferralinformationscan === "0" ||
      data[0].internalreferralinformationscan === null
        ? false
        : true,
    InternalReferralInformationUploadDate:
      data[0].internalreferralinformationuploaddate==="" ||data[0].internalreferralinformationuploaddate=== null
      ?data[0].internalreferralinformationdate:data[0].internalreferralinformationuploaddate,
    InternalReferralInformationReviewed:data[0]?.internalreferralinformationreviewed==="1" ? true : false,
    InternalReferralInformationIssues:"",
//identification
    LNEClientReferralForm:
      data[0].lneclientreferralform === "0" ||
      data[0].lneclientreferralform === null
        ? false
        : true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEClientReferralFormPDF:
      data[0].lneclientreferralformpdf === "0" ||
      data[0].lneclientreferralformpdf === null
        ? false
        : true,
    LNEClientReferralFormScan:
      data[0].lneclientreferralformscan === "0" ||
      data[0].lneclientreferralformscan === null
        ? false
        : true,
    LNEClientReferralFormReviewed:data[0]?.lneclientreferralformreviewed==="1" ? true : false,
    LNEClientReferralFormIssues:"",
    LNEClientReferralFormUploadDate:
      data[0].lneclientreferralformuploaddate==="" || data[0].lneclientreferralformuploaddate===null
      ?data[0].lneclientreferralformdate: data[0].lneclientreferralformuploaddate || "",


   /*  LNEHNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    LNEHNSEligibilityFormDate: data[0].hnseligibilityformdate,
    LNEHNSEligibilityFormPDF:
      data[0].hnseligibilityformpdf === "0" ||
      data[0].hnseligibilityformpdf === null
        ? false
        : true,
    LNEHNSEligibilityFormScan:
      data[0].hnseligibilityformscan === "0" ||
      data[0].hnseligibilityformscan === null
        ? false
        : true,
    LNEHNSEligibilityFormUploadDate:
      data[0].hnseligibilityformuploaddate || null,
      LNEHNSEligibilityFormPDF:
      data[0].hnseligibilityformpdf === "0" ||
      data[0].hnseligibilityformpdf === null
        ? false
        : true, */

    

    HNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate,
    HNSEligibilityFormPDF:
      data[0].hnseligibilityformpdf === "0" ||
      data[0].hnseligibilityformpdf === null
        ? false
        : true,
    HNSEligibilityFormScan:
      data[0].hnseligibilityformscan === "0" ||
      data[0].hnseligibilityformscan === null
        ? false
        : true,
    HNSEligibilityFormReviewed: data[0]?.hnseligibilityformreviewed === "0" ? false : true,
    HNSEligibilityFormIssues:"",
    HNSEligibilityFormUploadDate: data[0].hnseligibilityformuploaddate==="" || data[0].hnseligibilityformuploaddate===null
    ?data[0].hnseligibilityformdate:data[0].hnseligibilityformuploaddate,

    HNSReadinessForm:
      data[0].hnsreadinessform === "0" || data[0].hnsreadinessform === null
        ? false
        : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate,
    HNSReadinessFormUploadDate: data[0].hnsreadinessformuploaddate==="" || data[0].hnsreadinessformuploaddate===null
    ?data[0].hnsreadinessformdate:data[0].hnsreadinessformuploaddate,
    HNSReadinessFormScan:
      data[0].hnsreadinessformscan === "0" ||
      data[0].hnsreadinessformscan === null
        ? false
        : true,
    HNSReadinessFormReviewed: data[0]?.hnsreadinessformreviewed === "0" ? false : true,
    HNSReadinessFormIssues:"",
    HNSReadinessFormPDF:
      data[0].hnsreadinessformpdf === "0" ||
      data[0].hnsreadinessformpdf === null
        ? false
        : true,

    SupportGroups:
      data[0].supportgroups === "0" || data[0].supportgroups === null
        ? false
        : true,
    SupportGroupsDate: data[0].supportgroupsdate,
    SupportGroupsUploadDate: data[0].supportgroupsuploaddate==="" || data[0].supportgroupsuploaddate===null
    ?data[0].supportgroupsdate:data[0].supportgroupsuploaddate,
    SupportGroupsScan:
      data[0].supportgroupsscan === "0" || data[0].supportgroupsscan === null
        ? false
        : true,
    SupportGroupsPDF:
      data[0].supportgroupspdf === "0" || data[0].supportgroupspdf === null
        ? false
        : true,
    SupportGroupsReviewed: data[0]?.supportgroupsreviewed === "0" ? false : true,
    SupportGroupsIssues:"",

    IDGForm: data[0].idgform === "0" || data[0].idgform === null ? false : true,
    IDGFormDate: data[0].idgformdate,
    IDGFormUploadDate: data[0].idgformuploaddate==="" || data[0].idgformuploaddate===null
    ?data[0].idgformdate:data[0].idgformuploaddate,
    IDGFormScan:
      data[0].idgformscan === "0" || data[0].idgformscan === null
        ? false
        : true,
    IDGFormPDF:
      data[0].idgformpdf === "0" || data[0].idgformpdf === null ? false : true,
    IDGFormReviewed: data[0]?.idgformreviewed === "0" ? false : true,
    IDGFormIssues:"",
    clientUniqueId:data[0]?.id
  });

 
console.log("date sap", data[0])
  const [showIssuesFoundModal, setShowIssuesFoundModal] = useState(false);
  const [issueFounded, setIssueFounded] = useState({
    clientId: clientData.clientId,
    msaform: "",
    description: "",
    lastdateupdated: null,
    form_issues: "", //string used to update clientData
    form_reviewed: "", //string to update clientData
    form_uploadDate: "", //string to update clientData
    hcw: `${clientData.userFirstName} ${clientData.userLastName}`,
    hcwemail: data[0].clienthcwemail,
    formDate:null
  })


  const notifyMessage = () => {
    toast.success("MSA Form updated!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const resetIssuesAndReviewCheckbox = (issueFounded) => {
   setClientData({...clientData,[issueFounded.form_reviewed]: false, 
    [issueFounded.form_issues]: false, 
    [issueFounded.form_uploadDate]: issueFounded.formDate
  })

  }

  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const disableUserIfNotSupervisor = () =>
    loggedUserRole === "HCW" ? true : false;

  const todaysDate = new Date();


console.log(" data",data)



  const handleMsaform = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_supervisor_msa_form`,
        {
          clientData,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200 || response.statusText === "Ok") {
          notifyMessage();
           setTimeout(() => {
            router.push(`/supervisorDashboard`);
          }, 2300);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">
            Supervisor Edit MSA FORM
          </h3>
        </div>

        <main className="container mx-auto">
         
          <div className="flex items-center">
          <div className="flex gap-x-5">
         
        <BackButton />
        <BackToDashboardButton/>
        </div>
              </div>
          <section id="info" className="my-5">
            <div className="">
              <h3 className="font-black mt-5 mb-2 px-2 text-dark-blue">
                Info
              </h3>
              <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box flex items-end md:mb-1 my-5">
                  <div className="flex items-center mr-5"> 
                    <img src="/msa_form/calendar_black_icon.svg" width="24" />
                    <h3 className="font-black ml-1">Date</h3>
                  </div>  
                  <p>{todaysDate.toLocaleDateString()}</p>
                </div>

                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex gap-x-2 mb-1 items-end">
                      <img src="/client-icon.svg" width="24" />
                      <h3 className="font-black ">Client</h3>
                    </div>
                    <label className="block">
                      <span className="">Client Name</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        value={`${data[0].clientfirstname} ${data[0].clientlastname.charAt(0)}.`}
                        disabled
                      />
                    </label>
                   
                    <label className="block">
                      <span className="">Client ID</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        value={data[0].clientid}
                        disabled
                      />
                    </label>
                  </div>
                </div>

                <div className="service-action-plan-page-info-box">
                  
                  <div className="grid grid-cols-3 gap-4">
                  <div className="flex gap-x-2 mb-1 items-end">
                    <img src="/msa_form/LNEuser.svg" width="24" />
                    <h3 className="font-black ">Health Care Worker</h3>
                  </div>
                    <label className="block">
                      <span className="">First Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        value={clientData.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        value={clientData.userLastName}
                        disabled
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <h3 className="font-black mt-5 mb-2 px-2 text-dark-blue">
            Indicate which of the following forms you have uploaded to the
            client&apos;s Dropbox
          </h3>
          
          <section
            id="form"
            className={`relative border-dark-blue rounded-xl mb-5`}
          >
            {/* {TABLE HEAD} */}
            {/* <div className={`${MSAStyles.line}`}></div> */}
            <div
              id="form-head"
              className={`${MSAStyles.formHeadTitlesSupervisor} grid gap-5 justify-center items-end rounded-tl-lg rounded-tr-lg py-1 mx-1`}
            >
              <div></div>
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
              <p className="text-center flex items-center justify-center">
                <img src="/msa_form/calendar_blue_icon.svg" className="mr-1"/>
                Date last updated</p>

                <p className="text-center flex items-center justify-center px-3">
                <img src="/msa_form/supervisor_reviewed_icon.svg" className="self-end"/>  
                  Supervisor has reviewed
                  </p>

                  <p className="text-center flex items-center justify-center">
                    <img src="/msa_form/issues_found_icon.svg" className="mr-1 self-end"/>  
                     Issues found
                  </p>
              
            </div>
            {/* {TABLE HEAD} */}


            <RowMsaFormSupervisor
              fieldName={"AIRS Intake Form"}
              form={clientData.AIRSIntakeForm}
              formDate={clientData.AIRSIntakeFormDate}
              formUploadDate={clientData.AIRSIntakeFormUploadDate}
              formPDF={clientData.AIRSIntakeFormPDF}
              formReviewed={clientData.AIRSIntakeFormReviewed}
              formIssues={clientData.AIRSIntakeFormIssues}
              formString={"AIRSIntakeForm"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].intake_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
            />

          
            <RowMsaFormSupervisor
              fieldName={"Comprehensive Behavioral Risk Assessment"}
              form={clientData.ComprehensiveRiskBehaviorAssessment}
              formDate={clientData.ComprehensiveRiskBehaviorAssessmentDate}
              formUploadDate={clientData.ComprehensiveRiskBehaviorAssessmentUploadDate}
              formPDF={clientData.ComprehensiveRiskBehaviorAssessmentPDF}
              formReviewed={clientData.ComprehensiveRiskBehaviorAssessmentReviewed}
              formIssues={clientData.ComprehensiveRiskBehaviorAssessmentIssues}
              formString={"ComprehensiveRiskBehaviorAssessment"}
              folder_url={data[0].cbra_folder_url}
              dependency_folder_url={data[0].cbra_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"Service Action Plan"}
              form={clientData.ServiceActionPlan}
              formDate={clientData.ServiceActionPlanDate}
              formUploadDate={clientData.ServiceActionPlanUploadDate}
              formPDF={clientData.ServiceActionPlanPDF}
              formReviewed={clientData.ServiceActionPlanReviewed}
              formIssues={clientData.ServiceActionPlanIssues}
              formString={"ServiceActionPlan"}
              folder_url={data[0].action_plans_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"Progress Note"}
              form={clientData.ProgressNote}
              formDate={clientData.ProgressNoteDate}
              formUploadDate={clientData.ProgressNoteUploadDate}
              formPDF={clientData.ProgressNotePDF}
              formReviewed={clientData.ProgressNoteReviewed}
              formIssues={clientData.ProgressNoteIssues}
              formString={"ProgressNote"}
              folder_url={data[0].linkage_navigation_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />

          
            <RowMsaFormSupervisor
              fieldName={"Status Changes/Closure Forms"}
              form={clientData.StatusChangesForm}
              formDate={clientData.StatusChangesFormDate}
              formUploadDate={clientData.StatusChangesFormUploadDate}
              formPDF={clientData.StatusChangesFormPDF}
              formReviewed={clientData.StatusChangesFormReviewed}
              formIssues={clientData.StatusChangesFormIssues}
              formString={"StatusChangesForm"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />

            <RowMsaFormSupervisor
              fieldName={"Comprehensive Behavioral Risk Assessment Updates"}
              form={clientData.ComprehensiveRiskBehaviorAssessmentUpdates}
              formDate={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate}
              formUploadDate={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate}
              formPDF={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesPDF}
              formReviewed={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed}
              formIssues={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesIssues}
              formString={"ComprehensiveRiskBehaviorAssessmentUpdates"}
              folder_url={data[0].cbra_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"M11Q"}
              form={clientData.M11QForm}
              formDate={clientData.M11QFormDate}
              formUploadDate={clientData.M11QFormUploadDate}
              formPDF={clientData.M11QFormPDF}
              formReviewed={clientData.M11QFormReviewed}
              formIssues={clientData.M11QFormIssues}
              formString={"M11QForm"}
              folder_url={data[0].medical_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />

            <RowMsaFormSupervisor
              fieldName={"CD4/VL Check Reports"}
              form={clientData.CD4VLReports}
              formDate={clientData.CD4VLReportsDate}
              formUploadDate={clientData.CD4VLReportsUploadDate}
              formPDF={clientData.CD4VLReportsPDF}
              formReviewed={clientData.CD4VLReportsReviewed}
              formIssues={clientData.CD4VLReportsIssues}
              formString={"CD4VLReports"}
              folder_url={data[0].medical_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"Initial Treatment Adherence Intake"}
              form={clientData.InitialTreatmentAdherenceIntake}
              formDate={clientData.InitialTreatmentAdherenceIntakeDate}
              formUploadDate={clientData.InitialTreatmentAdherenceIntakeUploadDate}
              formPDF={clientData.InitialTreatmentAdherenceIntakePDF}
              formReviewed={clientData.InitialTreatmentAdherenceIntakeReviewed}
              formIssues={clientData.InitialTreatmentAdherenceIntakeIssues}
              formString={"InitialTreatmentAdherenceIntake"}
              folder_url={data[0].medical_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"Treatment Adherence Updates"}
              form={clientData.TreatmentAdherenceUpdates}
              formDate={clientData.TreatmentAdherenceUpdatesDate}
              formUploadDate={clientData.TreatmentAdherenceUpdatesUploadDate}
              formPDF={clientData.TreatmentAdherenceUpdatesPDF}
              formReviewed={clientData.TreatmentAdherenceUpdatesReviewed}
              formIssues={clientData.TreatmentAdherenceUpdatesIssues}
              formString={"TreatmentAdherenceUpdates"}
              folder_url={data[0].medical_folder_url}
              dependency_folder_url={data[0].action_plans_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS Collateral Information"}
              form={clientData.AIRSCollateralInformation}
              formDate={clientData.AIRSCollateralInformationDate}
              formUploadDate={clientData.AIRSCollateralInformationUploadDate}
              formPDF={clientData.AIRSCollateralInformationPDF}
              formReviewed={clientData.AIRSCollateralInformationReviewed}
              formIssues={clientData.AIRSCollateralInformationIssues}
              formString={"AIRSCollateralInformation"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS Drug Regimen History"}
              form={clientData.AIRSDrugRegimen}
              formDate={clientData.AIRSDrugRegimenDate}
              formUploadDate={clientData.AIRSDrugRegimenUploadDate}
              formPDF={clientData.AIRSDrugRegimenPDF}
              formReviewed={clientData.AIRSDrugRegimenReviewed}
              formIssues={clientData.AIRSDrugRegimenFormIssues}
              formString={"AIRSDrugRegimen"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />

            <RowMsaFormSupervisor
              fieldName={"AIRS Financial Information"}
              form={clientData.AIRSFinancialInformation}
              formDate={clientData.AIRSFinancialInformationDate}
              formUploadDate={clientData.AIRSFinancialInformationUploadDate}
              formPDF={clientData.AIRSFinancialInformationPDF}
              formReviewed={clientData.AIRSFinancialInformationReviewed}
              formIssues={clientData.AIRSFinancialInformationIssues}
              formString={"AIRSFinancialInformation"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'}
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS HIV AIDS Risk History"}
              form={clientData.AIRSHIVAIDSRiskHistory}
              formDate={clientData.AIRSHIVAIDSRiskHistoryDate}
              formUploadDate={clientData.AIRSHIVAIDSRiskHistoryUploadDate}
              formPDF={clientData.AIRSHIVAIDSRiskHistoryPDF}
              formReviewed={clientData.AIRSHIVAIDSRiskHistoryReviewed}
              formIssues={clientData.AIRSHIVAIDSRiskHistoryIssues}
              formString={"AIRSHIVAIDSRiskHistory"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS HIV Medical Provider History"}
              form={clientData.AIRSHIVMedicalProvider}
              formDate={clientData.AIRSHIVMedicalProviderDate}
              formUploadDate={clientData.AIRSHIVMedicalProviderUploadDate}
              formPDF={clientData.AIRSHIVMedicalProviderPDF}
              formReviewed={clientData.AIRSHIVMedicalProviderReviewed}
              formIssues={clientData.AIRSHIVMedicalProviderIssues}
              formString={"AIRSHIVMedicalProvider"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS HIV Status History"}
              form={clientData.AIRSHIVStatusHistory}
              formDate={clientData.AIRSHIVStatusHistoryDate}
              formUploadDate={clientData.AIRSHIVStatusHistoryUploadDate}
              formPDF={clientData.AIRSHIVStatusHistoryPDF}
              formReviewed={clientData.AIRSHIVStatusHistoryReviewed}
              formIssues={clientData.AIRSHIVStatusHistoryIssues}
              formString={"AIRSHIVStatusHistory"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"AIRS HCV History"}
              form={clientData.AIRSHCVHistory}
              formDate={clientData.AIRSHCVHistoryDate}
              formUploadDate={clientData.AIRSHCVHistoryUploadDate}
              formPDF={clientData.AIRSHCVHistoryPDF}
              formReviewed={clientData.AIRSHCVHistoryReviewed}
              formIssues={clientData.AIRSHCVHistoryIssues}
              formString={"AIRSHCVHistory"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />

            
            <RowMsaFormSupervisor
              fieldName={"AIRS Housing Information"}
              form={clientData.AIRSHousingInformation}
              formDate={clientData.AIRSHousingInformationDate}
              formUploadDate={clientData.AIRSHousingInformationUploadDate}
              formPDF={clientData.AIRSHousingInformationPDF}
              formReviewed={clientData.AIRSHousingInformationReviewed}
              formIssues={clientData.AIRSHousingInformationIssues}
              formString={"AIRSHousingInformation"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"AIRS Insurance Information"}
              form={clientData.AIRSInsuranceInformation}
              formDate={clientData.AIRSInsuranceInformationDate}
              formUploadDate={clientData.AIRSInsuranceInformationUploadDate}
              formPDF={clientData.AIRSInsuranceInformationPDF}
              formReviewed={clientData.AIRSInsuranceInformationReviewed}
              formIssues={clientData.AIRSInsuranceInformationIssues}
              formString={"AIRSInsuranceInformation"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"AIRS Substance Use History"}
              form={clientData.AIRSSubstanceUseHistory}
              formDate={clientData.AIRSSubstanceUseHistoryDate}
              formUploadDate={clientData.AIRSSubstanceUseHistoryUploadDate}
              formPDF={clientData.AIRSSubstanceUseHistoryPDF}
              formReviewed={clientData.AIRSSubstanceUseHistoryReviewed}
              formIssues={clientData.AIRSSubstanceUseHistoryIssues}
              formString={"AIRSSubstanceUseHistory"}
              folder_url={data[0].tickler_updates_folder_url}
              dependency_folder_url={data[0].tickler_updates_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-blue'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"LNE Client Rights"}
              form={clientData.LNEClientRights}
              formDate={clientData.LNEClientRightsDate}
              formUploadDate={clientData.LNEClientRightsUploadDate}
              formPDF={clientData.LNEClientRightsPDF}
              formReviewed={clientData.LNEClientRightsReviewed}
              formIssues={clientData.LNEClientRightsIssues}
              formString={"LNEClientRights"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"LNE Client Grievance Policy & Procedure"}
              form={clientData.LNEClientGrievancePolicyProcedure}
              formDate={clientData.LNEClientGrievancePolicyProcedureDate}
              formUploadDate={clientData.LNEClientGrievancePolicyProcedureUploadDate}
              formPDF={clientData.LNEClientGrievancePolicyProcedurePDF}
              formReviewed={clientData.LNEClientGrievancePolicyProcedureReviewed}
              formIssues={clientData.LNEClientGrievancePolicyProcedureIssues}
              formString={"LNEClientGrievancePolicyProcedure"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"LNE Program Rules"}
              form={clientData.LNEProgramRules}
              formDate={clientData.LNEProgramRulesDate}
              formUploadDate={clientData.LNEProgramRulesUploadDate}
              formPDF={clientData.LNEProgramRulesPDF}
              formReviewed={clientData.LNEProgramRulesReviewed}
              formIssues={clientData.LNEProgramRulesIssues}
              formString={"LNEProgramRules"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].miscellaneous_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"LNE Emergency Contact Consent"}
              form={clientData.LNEEmergencyContactConsent}
              formDate={clientData.LNEEmergencyContactConsentDate}
              formUploadDate={clientData.LNEEmergencyContactConsentUploadDate}
              formPDF={clientData.LNEEmergencyContactConsentPDF}
              formReviewed={clientData.LNEEmergencyContactConsentReviewed}
              formIssues={clientData.LNEEmergencyContactConsentIssues}
              formString={"LNEEmergencyContactConsent"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"LNE Consent for Release of Confidential Information"}
              form={clientData.LNEConsentForReleaseOfConfidentialInformation}
              formDate={clientData.LNEConsentForReleaseOfConfidentialInformationDate}
              formUploadDate={clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate}
              formPDF={clientData.LNEConsentForReleaseOfConfidentialInformationPDF}
              formReviewed={clientData.LNEConsentForReleaseOfConfidentialInformationReviewed}
              formIssues={clientData.LNEConsentForReleaseOfConfidentialInformationIssues}
              formString={"LNEConsentForReleaseOfConfidentialInformation"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"HIPAA Consent Form (OCA Form 960)"}
              form={clientData.HIPPAConsentForm}
              formDate={clientData.HIPPAConsentFormDate}
              formUploadDate={clientData.HIPPAConsentFormUploadDate}
              formPDF={clientData.HIPPAConsentFormPDF}
              formReviewed={clientData.HIPPAConsentFormReviewed}
              formIssues={clientData.HIPPAConsentFormIssues}
              formString={"HIPPAConsentForm"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"NYC DOHMH Notice of Privacy Practices - Acknowledgement of Receipt"}
              form={clientData.NYCDOHMHNoticeOfPrivacyPractices}
              formDate={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate}
              formUploadDate={clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate}
              formPDF={clientData.NYCDOHMHNoticeOfPrivacyPracticesPDF}
              formReviewed={clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed}
              formIssues={clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues}
              formString={"NYCDOHMHNoticeOfPrivacyPractices"}
              folder_url={data[0].consent_folder_url}
              dependency_folder_url={data[0].consent_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-green'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"Linkage, Retention, & Adherence Forms"}
              form={clientData.LinkageRetentionAdherenceForms}
              formDate={clientData.LinkageRetentionAdherenceFormsDate}
              formUploadDate={clientData.LinkageRetentionAdherenceFormsUploadDate}
              formPDF={clientData.LinkageRetentionAdherenceFormsPDF}
              formReviewed={clientData.LinkageRetentionAdherenceFormsReviewed}
              formIssues={clientData.LinkageRetentionAdherenceFormsIssues}
              formString={"LinkageRetentionAdherenceForms"}
              folder_url={data[0].linkage_navigation_folder_url}
              dependency_folder_url={data[0].linkage_navigation_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-pink'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"LNE Referral Information"}
              form={clientData.InternalReferralInformation}
              formDate={clientData.InternalReferralInformationDate}
              formUploadDate={clientData.InternalReferralInformationUploadDate}
              formPDF={clientData.InternalReferralInformationPDF}
              formReviewed={clientData.InternalReferralInformationReviewed}
              formIssues={clientData.InternalReferralInformationIssues}
              formString={"InternalReferralInformation"}
              folder_url={data[0].miscellaneous_folder_url}
              dependency_folder_url={data[0].linkage_navigation_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-pink'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"Identification"}
              form={clientData.LNEClientReferralForm}
              formDate={clientData.LNEClientReferralFormDate}
              formUploadDate={clientData.LNEClientReferralFormUploadDate}
              formPDF={clientData.LNEClientReferralFormPDF}
              formReviewed={clientData.LNEClientReferralFormReviewed}
              formIssues={clientData.LNEClientReferralFormIssues}
              formString={"LNEClientReferralForm"}
              folder_url={data[0].miscellaneous_folder_url}
              dependency_folder_url={data[0].miscellaneous_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-pink'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"LNE HNS Eligibility Form"}
              form={clientData.HNSEligibilityForm}
              formDate={clientData.HNSEligibilityFormDate}
              formUploadDate={clientData.HNSEligibilityFormUploadDate}
              formPDF={clientData.HNSEligibilityFormPDF}
              formReviewed={clientData.HNSEligibilityFormReviewed}
              formIssues={clientData.HNSEligibilityFormIssues}
              formString={"HNSEligibilityForm"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].miscellaneous_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-purple'} 
              />
            
            <RowMsaFormSupervisor
              fieldName={"HNS Readiness Assessment"}
              form={clientData.HNSReadinessForm}
              formDate={clientData.HNSReadinessFormDate}
              formUploadDate={clientData.HNSReadinessFormUploadDate}
              formPDF={clientData.HNSReadinessFormPDF}
              formReviewed={clientData.HNSReadinessFormReviewed}
              formIssues={clientData.HNSReadinessFormIssues}
              formString={"HNSReadinessForm"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].intake_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-purple'} 
              />
           
            <RowMsaFormSupervisor
              fieldName={"Support Groups"}
              form={clientData.SupportGroups}
              formDate={clientData.SupportGroupsDate}
              formUploadDate={clientData.SupportGroupsUploadDate}
              formPDF={clientData.SupportGroupsPDF}
              formReviewed={clientData.SupportGroupsReviewed}
              formIssues={clientData.SupportGroupsIssues}
              formString={"SupportGroups"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].support_groups_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-purple'} 
              />

           
            <RowMsaFormSupervisor
              fieldName={"IDG"}
              form={clientData.IDGForm}
              formDate={clientData.IDGFormDate}
              formUploadDate={clientData.IDGFormUploadDate}
              formPDF={clientData.IDGFormPDF}
              formReviewed={clientData.IDGFormReviewed}
              formIssues={clientData.IDGFormIssues}
              formString={"IDGForm"}
              folder_url={data[0].intake_folder_url}
              dependency_folder_url={data[0].intake_folder_url}
              setClientData={setClientData}
              setIssueFounded={setIssueFounded}
              showIssuesFoundModal={showIssuesFoundModal}
              setShowIssuesFoundModal={setShowIssuesFoundModal}
              bgColor={'bg-light-purple'} 
              />
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button
                className="btn-darkBlue hover:btn-blue px-5 py-1 rounded text-white flex items-center justify-between mr-5"
                onClick={() => handleMsaform()}
              >
                <Image src={checkUpdateicon} />
                <p className="ml-2">Save and Update</p>
              </button>
            </div>
          </section>
        </main>
      </Layout>
      {showIssuesFoundModal && <IssuesFoundModal 
      clientId={clientData.clientId} 
      HCW={clientData.userFirstName +" "+ clientData.userLastName}
      issueFounded={issueFounded}
      setIssueFounded={setIssueFounded}
      showIssuesFoundModal={showIssuesFoundModal}
      setShowIssuesFoundModal={setShowIssuesFoundModal}
      resetIssuesAndReviewCheckbox={resetIssuesAndReviewCheckbox}
      />}
    </>
  );
};

export default EditSupervisorMSAFormPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientid}`
    );

    const data = await response.json();
    return { props: { data } };
  },
});
