export async function updateTechnicianStage(id, payload) {
	try {
		const response = await axios.patch(`${SALES_API_URL}/${id}/technician-stage`, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
export async function updateSalesStage(id, payload) {
	try {
		const response = await axios.patch(`${SALES_API_URL}/${id}/sales-stage`, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
export async function updateOperationsStage(id, payload) {
	try {
		const response = await axios.patch(`${SALES_API_URL}/${id}/operations-stage`, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
export async function getSaleAudit(id) {
	try {
		const response = await axios.get(`${SALES_API_URL}/${id}/audit`);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
export async function updateAccountsStage(id, payload) {
	try {
		const response = await axios.patch(`${SALES_API_URL}/${id}/accounts-stage`, payload, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
export async function getSaleById(id) {
	try {
		const response = await axios.get(`${SALES_API_URL}/${id}`);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
import axios from 'axios';

const SALES_API_URL = '/api/v1/sales';

export async function getSales() {
	try {
		const response = await axios.get(SALES_API_URL);
		return response.data;
	} catch (error) {
		throw error.response?.data || error;
	}
}
