<?php

namespace App\Http\Controllers\Clients;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClientsController extends Controller
{
    public function index()
    {
        return inertia::render('Clients/Index');
    }

    public function create()
    {
        return inertia::render('Clients/Create', [
            'name' => 'Client Name',
            'logo' => 'Upload Client Logo',
            'website' => 'Client Website URL',
            'description' => 'Client Description',
            'order' => 'Display Order',
        ]);
    }

    public function edit($client)
    {
        return inertia::render('Clients/Edit', [
            'client' => $client,
        ]);
    }

    public function update(Request $request, $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        $client->update($validated);

        return redirect()->route('clients.index')->with('success', 'Client updated successfully.');
    }

    
}
