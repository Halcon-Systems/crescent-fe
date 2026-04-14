import { userRequest } from '@/lib/RequestMethods';

const API_BASE = '/api/v1/sales';


export async function updateTechnicianStage(id, payload) {
	try {
		const response = await userRequest.patch(`${API_BASE}/${id}/technician-stage`, payload);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error updating technician stage:', error);
		throw error;
	}
}
export async function createSale(payload) {
	try {
		const response = await userRequest.post(API_BASE, payload);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error creating sale:', error);
		throw error;
	}
}
export async function updateOperationsStage(id, payload) {
	try {
		const response = await userRequest.patch(`${API_BASE}/${id}/operations-stage`, payload);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error updating operations stage:', error);
		throw error;
	}
}
export async function getSaleAudit(id) {
	try {
		const response = await userRequest.get(`${API_BASE}/${id}/audit`);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error fetching sale audit:', error);
		throw error;
	}
}
export async function updateAccountsStage(id, payload) {
	try {
		const response = await userRequest.patch(`${API_BASE}/${id}/accounts-stage`, payload);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error updating accounts stage:', error);
		throw error;
	}
}
export async function getSaleById(id) {
	try {
		const response = await userRequest.get(`${API_BASE}/${id}`);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error fetching sale by id:', error);
		throw error;
	}
}

export async function getSales() {
	try {
		const response = await userRequest.get(API_BASE);
		return response.data?.data || response.data;
	} catch (error) {
		console.error('Error fetching sales:', error);
		throw error;
	}
}
