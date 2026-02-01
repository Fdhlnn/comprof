<?php

namespace App\Http\Controllers\Events;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index()
    {
        return inertia::render('Events/Index');
    }
}
