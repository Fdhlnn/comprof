<?php

namespace App\Http\Controllers\Clients;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminClientsController extends Controller
{

    public function index()
    {
        return Inertia::render('admin/clients', [
            'clients' => Clients::latest()->get(),
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string',
            'company'    => 'nullable|string',
            'message' => 'required|string',
            'rating'  => 'required|integer|min:1|max:5',
            'avatar'  => 'required|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('clients', 'public');
        }

        Clients::create($data);

        return redirect()->back();
    }

    // Update client review
    public function update(Request $request, Clients $client)
    {
        $data = $request->validate([
            'name'    => 'required|string',
            'company'    => 'nullable|string',
            'message' => 'required|string',
            'rating'  => 'required|integer|min:1|max:5',
            'avatar'  => 'required|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            Storage::disk('public')->delete($client->avatar);
            $data['avatar'] = $request->file('avatar')->store('clients', 'public');
        }

        $client->update($data);

        return redirect()->back();
    }


    public function destroy(Clients $clients)
    {
        Storage::disk('public')->delete($clients->avatar);
        $clients->delete();

        return redirect()->route('admin.clients');
    }
}
